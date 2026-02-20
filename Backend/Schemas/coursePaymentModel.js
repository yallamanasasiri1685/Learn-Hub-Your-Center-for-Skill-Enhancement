const mongoose = require("mongoose");

const coursePaymentModel = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
    cardDetails: {
      cardholdername: {
        type: String,
      },
      cardnumber: {
        type: String, // ✅ Use String instead of Number
      },
      cvvcode: {
        type: String, // ✅ Use String instead of Number
      },
      expmonthyear: {
        type: String,
      },
    },
    status: {
      type: String,
      default: "enrolled",
    },
  },
  {
    timestamps: true,
    // strict: false, ✅ Removed for safety
  }
);

const coursePaymentSchema = mongoose.model("coursePayment", coursePaymentModel);

module.exports = coursePaymentSchema;
