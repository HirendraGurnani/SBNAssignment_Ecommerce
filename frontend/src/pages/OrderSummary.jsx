import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const cart = state?.cart;

  if (!cart) {
    return (
      <div className="container text-center py-5">
        <h3>No order data found.</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ background: "#F7FAFC", minHeight: "100vh" }}>
      <h2 className="text-center mb-5 fw-bold" style={{ color: "#5A67D8" }}>🧾 Order Summary</h2>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <ul className="list-group list-group-flush">
              {cart.items.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  <span>{item.name} × {item.quantity}</span>
                  <strong>₹{item.lineTotal}</strong>
                </li>
              ))}
            </ul>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span>
              <span style={{ color: "#48BB78" }}>₹{cart.total}</span>
            </div>
            <div className="text-center mt-4">
              <button
                className="btn btn-lg"
                style={{ background: "#5A67D8", color: "white" }}
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
