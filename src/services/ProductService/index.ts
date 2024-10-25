import { FilterQuery } from "mongoose";
import cache from "../../utils/cache";
import { IProduct } from "../../models/product";
import ProductModel from "../../models/product";
import { CustomError } from "../../middlewares/errorHandler";

const getCachedProduct = async (productId: string) => {
  const product = await cache.get(`product:${productId}`);

  if (product) {
    return JSON.parse(product);
  }

  return null;
};

const cacheProduct = (productId: string, productData: any) => {
  cache.setEx(`product:${productId}`, 3600, JSON.stringify(productData)); // Cache for 1 hour
};

export const GetAllProducts = async (
  filter: FilterQuery<IProduct>,
  page: number = 1,
  limit: number = 10
) => {
  try {
    const products = await ProductModel.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const total_products = await ProductModel.countDocuments(filter);

    return { products, total_products };
  } catch (error: any) {
    throw new CustomError(error.message, error.statusCode || 500);
  }
};

export const GetProductById = async (productId: string) => {
  try {
    const productFromCache = await getCachedProduct(productId);

    if (productFromCache) {
      return productFromCache;
    }

    // Fetch product from database
    const productFromDB = await ProductModel.findById(productId);

    // Cache the product
    cacheProduct(productId, productFromDB);

    return productFromDB;
  } catch (error: any) {
    throw new CustomError(error.message, error.statusCode || 500);
  }
};

export const UpdateProduct = async (productId: string, updateData: any) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (updatedProduct) {
      const productFromCache = await getCachedProduct(productId);

      if (productFromCache) {
        // Update cached product
        cacheProduct(productId, {
          ...productFromCache,
          ...updateData,
        });
      }
    }

    return updatedProduct;
  } catch (error: any) {
    throw new CustomError(error.message, error.statusCode || 500);
  }
};
