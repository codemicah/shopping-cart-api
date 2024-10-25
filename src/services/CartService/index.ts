import { CustomError } from "../../middlewares/errorHandler";
import { Types } from "mongoose";
import ProductModel from "../../models/product";
import CartModel from "../../models/cart";
import { ObjectId } from "mongodb";

export const AddItemToCart = async ({
  userId,
  productId,
  quantity,
}: {
  userId: Types.ObjectId;
  productId: string;
  quantity: number;
}) => {
  try {
    // Fetch product to check stock
    const product = await ProductModel.findById(productId);

    if (!product) {
      throw new CustomError("Product not found", 404);
    }

    if (product.stock < quantity) {
      throw new CustomError("Insufficient stock", 400); // Prevent adding more than available
    }

    // Find user's cart or create a new one
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      cart = new CartModel({ userId, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productId)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId: new ObjectId(productId), quantity });
    }

    await cart.save();
    return cart;
  } catch (error: any) {
    throw new CustomError(error.message, 500);
  }
};

export const RemoveItemFromCart = async ({
  userId,
  productId,
}: {
  userId: Types.ObjectId;
  productId: string;
}) => {
  try {
    const cart = await CartModel.findOneAndUpdate(
      { userId },
      {
        $pull: { items: { productId } },
      }
    );

    if (!cart) {
      throw new CustomError("Cart not found", 404);
    }

    return cart;
  } catch (error: any) {
    throw new CustomError(error.message, 500);
  }
};
