import Stripe from "stripe";

const stripe_key = process.env.STRIPE_SECRET_KEY;
if (!stripe_key) {
  throw Error("Please provide stirpe secret key");
}

const stripe = new Stripe(stripe_key);

export default stripe;
