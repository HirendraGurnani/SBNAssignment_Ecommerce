🛒 Simple E-Commerce Cart System

📄 Project Description
This is a mini full-stack e-commerce cart application built to demonstrate modern web development practices using Express.js, MongoDB, and a lightweight frontend UI.

Users can:
- View available products.
- Add or remove products from the shopping cart.
- Apply discount codes.
- View subtotal and total with optional tax.
- Clear the entire cart.

The project is designed to be simple yet structured like a real-world MERN-style application, making it perfect for learning or evaluation purposes.

------------------------------------------------------------

⚙️ How to Run the Project

1. Clone the repository:
   git clone https://github.com/HirendraGurnani/SBNAssignment_Ecommerce.git
   cd ecommerce-cart-system

------------------------------------------------------------

🚀 Backend Setup (Server + Database)
1. cd backend
2. npm install
3. Make sure MongoDB is running locally (default port 27017).
4. Run the backend:
   node index.js
   OR
   npx nodemon index.js
5. Once started, you should see:
   ✅ MongoDB Connected
   🌱 Products seeded successfully!
   🚀 Server running on http://localhost:3000

API Endpoints:
   GET  /products
   GET  /products/:id
   GET  /cart
   POST /cart/add
   POST /cart/remove
   POST /cart/apply-discount
   POST /cart/clear

------------------------------------------------------------

💻 Frontend Setup
1. cd frontend
2. npm install
3. npm run dev
4. Open http://localhost:5173

------------------------------------------------------------

🧰 Technologies Used

Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS
- Morgan

Frontend:
- React.js (Vite + React)
- Axios
- Bootstrap (with custom colors)

------------------------------------------------------------

🧾 Notes
- The database is automatically seeded on first run.
- If products don’t appear, ensure MongoDB is running.
- No .env file required — MongoDB URI is hardcoded as mongodb://127.0.0.1:27017/ecommerce_cart.

------------------------------------------------------------

✨ Example Workflow
1. Start backend (node index.js)
2. Start frontend (npm run dev)
3. Add products and manage cart
4. Apply discount (SAVE10)
5. View subtotal, total, and tax dynamically
