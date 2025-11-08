import React from "react";

export default function ProductCard({ product, inCart, addToCart, removeFromCart, theme, loading }) {
  return (
    <div className="col-md-6" key={product.id}>
      <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "1rem" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ color: theme.text }}>{product.name}</h5>
          <p className="card-text text-muted">{product.description}</p>
          <p className="fw-semibold">₹{product.price}</p>

          {inCart ? (
            <div className="d-flex justify-content-center align-items-center gap-3">
              <button className="btn btn-outline-danger rounded-circle" onClick={() => removeFromCart(product.id)}>−</button>
              <span className="fw-semibold">{inCart.quantity}</span>
              <button className="btn btn-outline-success rounded-circle" onClick={() => addToCart(product)}>+</button>
            </div>
          ) : (
            <button
              className="btn w-100"
              style={{ backgroundColor: theme.accent, color: "white" }}
              disabled={loading || product.stock <= 0}
              onClick={() => addToCart(product)}
            >
              {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
