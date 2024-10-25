import { Schema, model } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const ProductModel = model<IProduct>("product", productSchema);
export default ProductModel;
