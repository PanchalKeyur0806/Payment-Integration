import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import razorpay from "../config/razorpay";
import { catchAsync } from "../utils/catchAsync";

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    razorpay.orders.create(
      {
        amount: 5000,
        currency: "INR",
        receipt: "order_rcptid_11",
        method: "upi",
      },
      function (error, order) {
        if (error) {
          return next(new AppError("Some Error occured, ", 400));
        }

        res.status(200).json({
          status: "success",
          data: order,
        });
      },
    );
  },
);

export { createOrder };
