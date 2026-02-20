const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      set: function (value) {
        if (!value) return value;
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true, // ✅ Optional but recommended
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    type: {
      type: String,
      required: [true, "type is required"],
    },
    // enrolledCourses: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "course",
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.model("user", userModel);

module.exports = userSchema;
