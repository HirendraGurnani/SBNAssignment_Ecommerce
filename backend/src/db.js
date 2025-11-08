const PRODUCTS = [
  {
    id: "p1",
    name: "Wireless Mouse",
    price: 599.0,
    stock: 10,
    description: "Ergonomic wireless mouse",
  },
  {
    id: "p2",
    name: "Mechanical Keyboard",
    price: 2499.0,
    stock: 5,
    description: "RGB mechanical keyboard",
  },
  {
    id: "p3",
    name: "USB-C Charger",
    price: 799.0,
    stock: 20,
    description: "Fast 30W USB-C charger",
  },
  {
    id: "p4",
    name: "Noise-cancelling Headphones",
    price: 3999.0,
    stock: 3,
    description: "Over-ear noise cancelling",
  },
];

const cart = {
  items: {
  },
  discount: null,
};

const DISCOUNTS = {
  SAVE10: { type: "percent", value: 10 },
  TAKE50: { type: "flat", value: 50 },
};

function getProducts() {
  return PRODUCTS;
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) throw new Error("Product not found");
  if (quantity <= 0) throw new Error("Quantity must be >= 1");
  if (product.stock < quantity) throw new Error("Insufficient stock");

  if (!cart.items[productId]) {
    cart.items[productId] = { product: { ...product }, quantity: 0 };
  }
  cart.items[productId].quantity += quantity;
  product.stock -= quantity;
  return cart.items[productId];
}

function removeFromCart(productId, quantity = null) {
  const entry = cart.items[productId];
  if (!entry) throw new Error("Product not in cart");
  if (quantity === null || quantity >= entry.quantity) {
    const qty = entry.quantity;
    const product = getProductById(productId);
    if (product) product.stock += qty;
    delete cart.items[productId];
    return { removed: qty };
  }
  if (quantity <= 0) throw new Error("Quantity must be >= 1");
  if (quantity > entry.quantity)
    throw new Error("Quantity to remove exceeds quantity in cart");

  entry.quantity -= quantity;
  const product = getProductById(productId);
  if (product) product.stock += quantity;
  return { removed: quantity };
}

function clearCart() {
  Object.keys(cart.items).forEach((pid) => {
    const entry = cart.items[pid];
    const prod = getProductById(pid);
    if (prod) prod.stock += entry.quantity;
  });
  cart.items = {};
  cart.discount = null;
}
function applyDiscount(code) {
  const normalized = String(code || "").toUpperCase();
  const found = DISCOUNTS[normalized];
  if (!found) throw new Error("Invalid discount code");
  cart.discount = { code: normalized, ...found };
  return cart.discount;
}

function calculateCart(taxPercent = 0) {
  const items = Object.values(cart.items).map((e) => ({
    id: e.product.id,
    name: e.product.name,
    unitPrice: e.product.price,
    quantity: e.quantity,
    lineTotal: e.product.price * e.quantity,
  }));
  const subtotal = items.reduce((s, it) => s + it.lineTotal, 0);
  let discountAmount = 0;
  if (cart.discount) {
    if (cart.discount.type === "percent")
      discountAmount = (subtotal * cart.discount.value) / 100;
    else if (cart.discount.type === "flat")
      discountAmount = cart.discount.value;
  }
  const taxed = (subtotal - discountAmount) * (taxPercent / 100);
  const total = Math.max(0, subtotal - discountAmount + taxed);
  return {
    items,
    subtotal: round(subtotal),
    discount: cart.discount
      ? { ...cart.discount, amount: round(discountAmount) }
      : null,
    tax: round(taxed),
    total: round(total),
  };
}

function round(n) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

module.exports = {
  getProducts,
  getProductById,
  addToCart,
  removeFromCart,
  clearCart,
  applyDiscount,
  calculateCart,
  _internal: { PRODUCTS, cart, DISCOUNTS },
};
