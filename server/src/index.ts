import express from "express";
import dotenv from "dotenv";

import orderRoutes from "./routes/order.routes";

dotenv.config({ path: ".env" });

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api/orders", orderRoutes);

export default app;
