import React from "react";

export default function CartItem({ item, removeFromCart, theme }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
      <div>
        <strong>{item.name}</strong>
        <div className="small text-muted">Qty: {item.quantity}</div>
      </div>
      <div className="text-end">
        <div>₹{item.lineTotal}</div>
        <button
          className="btn btn-sm mt-1"
          style={{ backgroundColor: theme.primary, color: "white" }}
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </li>
  );
}
