const endpoints = {
  users: {
    id: (id: string) => `/api/users/${encodeURIComponent(id)}`,
  },
  products: {
    all: "/api/products",
    id: (id: string) => `/api/products/${encodeURIComponent(id)}`,
  },
  orders: {
    razorpay: "/api/orders/razorpay/",
  },
} as const;

export default endpoints;
