import app from "./index";
import { seedProducts } from "./seed/products";
import mongoose from "mongoose";

const PORT = process.env.PORT as string;


// connect database
mongoose.connect(process.env.DB_STRING as string).then(() => {
  console.log("Database connected successfully");
}).catch(error => {
  console.error("Database connection error:", error);
})

// upload product data to the database
seedProducts()



app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`),
);
