import React from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products, cart, addToCart, removeFromCart, theme, loading }) {
  return (
    <div className="card shadow-sm border-0 p-3" style={{ borderRadius: "1rem" }}>
      <h4 className="mb-4" style={{ color: theme.primary }}>Available Products</h4>
      <div className="row g-3">
        {products.map((p) => {
          const inCart = cart?.items?.find((i) => i.id === p.id);
          return (
            <ProductCard
              key={p.id}
              product={p}
              inCart={inCart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              theme={theme}
              loading={loading}
            />
          );
        })}
      </div>
    </div>
  );
}
