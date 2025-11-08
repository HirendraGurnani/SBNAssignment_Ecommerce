import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  name: String,
  price: Number,
  quantity: Number,
  lineTotal: Number,
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  discount: {
    code: String,
    amount: Number,
  },
});

export default mongoose.model("Cart", cartSchema);
