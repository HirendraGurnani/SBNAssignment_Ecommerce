import express from "express";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tax = Number(req.query.tax || 0);
    const cart = await Cart.findOne();
    if (!cart) return res.json({ items: [], subtotal: 0, total: 0 });

    const subtotal = cart.items.reduce((sum, i) => sum + i.lineTotal, 0);
    const total = subtotal + tax;

    res.json({ items: cart.items, subtotal, total });
  } catch (err) {
    console.error("Error fetching cart:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId)
      return res.status(400).json({ error: "productId is required" });

    const qty = quantity ? Number(quantity) : 1;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne();
    if (!cart) cart = new Cart({ items: [] });

    const existing = cart.items.find((i) => i.product.toString() === productId);
    if (existing) {
      existing.quantity += qty;
      existing.lineTotal = existing.quantity * product.price;
    } else {
      cart.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: qty,
        lineTotal: product.price * qty,
      });
    }

    await cart.save();
    res.status(201).json({ message: "Added to cart", cart });
  } catch (err) {
    console.error("Error adding to cart:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId)
      return res.status(400).json({ error: "productId is required" });

    const qty = quantity === undefined ? 1 : Number(quantity);
    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (i) => i.product.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ error: "Item not in cart" });

    if (qty === null || cart.items[itemIndex].quantity <= qty) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity -= qty;
      cart.items[itemIndex].lineTotal =
        cart.items[itemIndex].quantity * cart.items[itemIndex].price;
    }

    await cart.save();
    res.json({ message: "Removed", cart });
  } catch (err) {
    console.error("Error removing from cart:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.post("/apply-discount", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "code is required" });

    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    let discount = 0;
    if (code.toLowerCase() === "save10") {
      discount = cart.items.reduce((sum, i) => sum + i.lineTotal, 0) * 0.1;
    } else {
      return res.status(400).json({ error: "Invalid discount code" });
    }

    cart.discount = { code, amount: discount };
    await cart.save();

    res.json({ message: "Discount applied", discount });
  } catch (err) {
    console.error("Error applying discount:", err.message);
    res.status(400).json({ error: err.message });
  }
});

router.post("/clear", async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Error clearing cart:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
