const mongoose = require("mongoose");

const courseModel = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    C_educator: {
      type: String,
      required: [true, "name is required"],
    },
    C_title: {
      type: String,
      required: [true, "C_title is required"],
    },
    C_categories: {
      type: String,
      required: [true, "C_categories: is required"],
    },
    C_price: {
      type: String,
    },
    C_description: {
      type: String,
      required: [true, "C_description: is required"],
    },
    sections: [
      {
        S_title: String,
        S_content: {
          filename: String,
          path: String,
        },
        S_description: String,
      },
    ],
    enrolled: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const courseSchema = mongoose.model("course", courseModel);

module.exports = courseSchema;
