import React from "react";

export default function CheckoutModal({ orderPlaced, confirmOrder, cart, theme }) {
  return (
    <div
      className="modal fade"
      id="checkoutModal"
      tabIndex="-1"
      aria-labelledby="checkoutModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
          <div
            className="modal-header"
            style={{ backgroundColor: theme.primary, color: "white" }}
          >
            <h5 className="modal-title fw-semibold" id="checkoutModalLabel">
              Order Summary
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {orderPlaced ? (
              <div className="text-center py-4">
                <div style={{ fontSize: "3rem" }}>✅</div>
                <h5 className="fw-bold text-success mb-2">Order Placed Successfully!</h5>
                <p className="text-muted">Redirecting to order summary...</p>
              </div>
            ) : (
              <>
                {cart.items && cart.items.length > 0 ? (
                  <ul className="list-group mb-3">
                    {cart.items.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div>
                          <strong>{item.name}</strong>
                          <div className="small text-muted">Qty: {item.quantity}</div>
                        </div>
                        <span>₹{item.lineTotal}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted text-center">No items in cart.</p>
                )}

                <div className="d-flex justify-content-between border-top pt-3 mb-3">
                  <span>Subtotal:</span>
                  <strong>₹{cart.subtotal}</strong>
                </div>

                {cart.discount && (
                  <div className="d-flex justify-content-between text-success mb-2">
                    <span>Discount ({cart.discount.code}):</span>
                    <strong>-₹{cart.discount.amount}</strong>
                  </div>
                )}

                <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                  <span>Total:</span>
                  <span style={{ color: theme.accent }}>₹{cart.total}</span>
                </div>

                <div className="text-end">
                  <button
                    className="btn text-white px-4"
                    style={{
                      backgroundColor: theme.accent,
                      borderRadius: "0.5rem",
                    }}
                    onClick={confirmOrder}
                  >
                    Confirm Order
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
