import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const key_id = process.env.RAZORPAY_API_KEY;
const key_secret = process.env.RAZORPAY_SECRET_KEY;

if (!key_id || !key_secret) {
  throw new Error("Razorpay API credentials are missing");
}

let razorpay = new Razorpay({
  key_id,
  key_secret,
});

export default razorpay;
