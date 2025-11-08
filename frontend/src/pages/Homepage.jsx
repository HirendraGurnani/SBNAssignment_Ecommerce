import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";
import CheckoutModal from "../components/CheckoutModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : { items: [], subtotal: 0, total: 0 };
  });
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const API = "http://localhost:3000";

  const theme = {
    primary: "#5A67D8",
    accent: "#48BB78",
    bg: "#F7FAFC",
    text: "#2D3748",
  };

  useEffect(() => {
    axios.get(`${API}/products`).then((res) => setProducts(res.data));
    console.log("ran");
    
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setLoading(true);
    setCart((prev) => {
      const items = prev.items || [];
      const existing = items.find((i) => i.id === product.id);
      let newItems;
      if (existing) {
        newItems = items.map((i) =>
          i.id === product.id
            ? {
                ...i,
                quantity: i.quantity + 1,
                lineTotal: (i.quantity + 1) * product.price,
              }
            : i
        );
      } else {
        newItems = [
          ...items,
          { ...product, quantity: 1, lineTotal: product.price },
        ];
      }
      const subtotal = newItems.reduce((sum, i) => sum + i.lineTotal, 0);
      return { items: newItems, subtotal, total: subtotal };
    });
    setLoading(false);
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const newItems = prev.items
        .map((i) =>
          i.id === id
            ? {
                ...i,
                quantity: i.quantity - 1,
                lineTotal: (i.quantity - 1) * i.price,
              }
            : i
        )
        .filter((i) => i.quantity > 0);
      const subtotal = newItems.reduce((sum, i) => sum + i.lineTotal, 0);
      return { items: newItems, subtotal, total: subtotal };
    });
  };

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === "save10") {
      setCart((prev) => {
        const discount = prev.subtotal * 0.1;
        return {
          ...prev,
          discount: { code: "SAVE10", amount: discount },
          total: prev.subtotal - discount,
        };
      });
    } else alert("Invalid discount code");
    setDiscountCode("");
  };

  //   const confirmOrder = () => {
  //     setOrderPlaced(true);
  //     setTimeout(() => {
  //       localStorage.removeItem("cart");
  //       navigate("/order-summary", { state: { cart } });
  //     }, 1200);
  //   };

  const confirmOrder = () => {
    setOrderPlaced(true);

    setTimeout(() => {
      const modalEl = document.getElementById("checkoutModal");
      if (modalEl) {
        modalEl.classList.remove("show");
        modalEl.style.display = "none";
        modalEl.setAttribute("aria-hidden", "true");
      }

      document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
      document.body.classList.remove("modal-open");
      document.body.style = "";
      localStorage.removeItem("cart");
      navigate("/order-summary", { state: { cart } });
    }, 1200);
  };

  return (
    <div
      style={{
        backgroundColor: theme.bg,
        minHeight: "100vh",
        color: theme.text,
      }}
    >
      <div className="container py-5">
        <h1
          className="text-center mb-5 fw-bold"
          style={{ color: theme.primary }}
        >
          🛒 Simple E-Commerce Cart
        </h1>
        <div className="row g-4">
          <div className="col-md-8">
            <ProductList
              {...{ products, cart, addToCart, removeFromCart, theme, loading }}
            />
          </div>
          <div className="col-md-4">
            <Cart
              {...{
                cart,
                discountCode,
                setDiscountCode,
                applyDiscount,
                theme,
                removeFromCart,
              }}
            />
          </div>
        </div>
      </div>
      <CheckoutModal {...{ orderPlaced, confirmOrder, cart, theme }} />
    </div>
  );
}
