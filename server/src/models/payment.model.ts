import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Order reference
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    // Optional user reference (Guest checkout supported)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Payment provider
    provider: {
      type: String,
      enum: ["stripe", "razorpay"],
      required: true,
    },

    // Common payment information
    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
      uppercase: true,
      default: "INR",
    },

    status: {
      type: String,
      enum: [
        "created",
        "pending",
        "processing",
        "succeeded",
        "failed",
        "cancelled",
        "refunded",
        "partially_refunded",
      ],
      default: "created",
    },

    paymentMethod: {
      type: String,
      enum: ["card", "upi", "netbanking", "wallet", "emi", "other"],
    },

    transactionId: String,
    failureReason: String,
    paidAt: Date,
    refundedAt: Date,

    // Stripe specific fields
    stripe: {
      paymentIntentId: {
        type: String,
        sparse: true,
      },

      customerId: String,
      chargeId: String,
      checkoutSessionId: String,
      paymentMethodId: String,
      clientSecret: String,
      receiptUrl: String,
    },

    // Razorpay specific fields
    razorpay: {
      orderId: {
        type: String,
        sparse: true,
      },

      paymentId: {
        type: String,
        sparse: true,
      },
      signature: String,
      refundId: String,
      method: String,
      bank: String,
      wallet: String,
      vpa: String,
    },

    // Additional provider information
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
