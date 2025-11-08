import React from "react";
import CartItem from "./CartItem";

export default function Cart({
  cart,
  discountCode,
  setDiscountCode,
  applyDiscount,
  theme
}) {
  return (
    <div className="card shadow-sm border-0 p-3 sticky-top" style={{ borderRadius: "1rem", top: "20px" }}>
      <h4 className="mb-3" style={{ color: theme.primary }}>🛍️ Your Cart</h4>
      {cart?.items?.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        <ul className="list-group mb-3">
          {cart?.items?.map((i) => (
            <CartItem key={i.id} item={i} removeFromCart={() => removeFromCart(i.id)} theme={theme} />
          ))}
        </ul>
      )}

      {cart?.items?.length > 0 && (
        <>
          <div className="border-top pt-3 mb-3">
            <div className="d-flex justify-content-between">
              <span>Subtotal:</span>
              <strong>₹{cart.subtotal}</strong>
            </div>
            {cart.discount && (
              <div className="d-flex justify-content-between text-success">
                <span>Discount ({cart.discount.code}):</span>
                <strong>-₹{cart.discount.amount}</strong>
              </div>
            )}
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span style={{ color: theme.accent }}>₹{cart.total}</span>
            </div>
          </div>

          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button className="btn text-white" style={{ backgroundColor: theme.accent }} onClick={applyDiscount}>
              Apply
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn w-100"
              style={{ backgroundColor: theme.primary, color: "white" }}
              data-bs-toggle="modal"
              data-bs-target="#checkoutModal"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
