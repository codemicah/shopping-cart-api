import { startSession } from "mongoose";
import Product from "../../models/product";
import Cart from "../../models/cart";
import { cacheProductStock, getCachedProductStock } from "../../utils/cache";
import { CustomError } from "../../middlewares/errorHandler";

export const ProcessCheckout = async (userId: string) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new CustomError("Cart is empty", 400);
    }

    // Track products to update in cache after checkout
    const updatedProducts: { productId: string; newStock: number }[] = [];

    for (const cartItem of cart.items) {
      const productId = cartItem.productId._id.toString();

      // Check stock in Redis cache
      let stock = await getCachedProductStock(productId);

      // Fetch from DB if not in cache
      if (stock === null) {
        const product = await Product.findById(productId).session(session);

        if (!product)
          throw new CustomError(`Product not found: ${productId}`, 404);

        stock = product.stock;
        cacheProductStock(productId, stock); // Cache stock for future requests
      }

      if (stock < cartItem.quantity) {
        throw new CustomError(
          `Insufficient stock for product: ${productId}`,
          400
        );
      }

      // Deduct stock
      stock -= cartItem.quantity;
      updatedProducts.push({ productId, newStock: stock });

      // Update stock in database
      await Product.updateOne({ _id: productId }, { stock }, { session });
    }

    // Clear the cart after successful checkout
    cart.items = [];
    await cart.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    // Update Redis cache with new stock values
    updatedProducts.forEach(({ productId, newStock }) => {
      cacheProductStock(productId, newStock);
    });

    return { message: "Checkout successful" };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    throw new CustomError(error, error.statusCode || 500);
  }
};
