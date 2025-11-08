import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import productRoutes from "./routes/productsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import Product from "./models/Product.js";

const app = express();
const PORT = 3000;
const MONGO_URI = "mongodb://127.0.0.1:27017/ecommerce_cart";


app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


async function connectAndSeed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    const count = await Product.countDocuments();
    if (count === 0) {
      console.log("🌱 No products found — seeding initial data...");

      await Product.insertMany([
        {
          name: "Wireless Mouse",
          price: 599,
          stock: 10,
          description: "Ergonomic wireless mouse",
        },
        {
          name: "Mechanical Keyboard",
          price: 2499,
          stock: 5,
          description: "RGB mechanical keyboard",
        },
        {
          name: "USB-C Charger",
          price: 799,
          stock: 20,
          description: "Fast 30W USB-C charger",
        },
        {
          name: "Noise-cancelling Headphones",
          price: 3999,
          stock: 3,
          description: "Over-ear noise cancelling headphones",
        },
      ]);

      console.log("Products seeded successfully!");
    } else {
      console.log("Products already exist, skipping seeding.");
    }
  } catch (error) {
    console.error("Database connection or seeding failed:", error);
    process.exit(1);
  }
}

app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.get("/", (req, res) => {
  res.send("🛒 E-Commerce API with MongoDB is running...");
});

connectAndSeed().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
