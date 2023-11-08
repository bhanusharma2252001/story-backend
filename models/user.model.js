const mongoose = require("mongoose");
mongoose.set("debug", true);
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: String,
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },
    otp: {
      type: String,
      default: 0,
    },
    otpDate: Date,
    otpDate2: Date,
    otp2: {
      type: String,
      default: 0,
    },
    email: {
      type: String,
      sparse: true,
      unique: true,
      trim: true,
      minlength: 3,
      lowercase: true,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.statics.findByToken = function (token, res) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, "jwtkey");
  } catch (e) {
    throw e.message || "Unauthorised request";
  }
  return User.findOne({
    _id: decoded._id,
  })
    .then((user) => {
      if (!user) {
        return Promise.reject({ message: "Unauthorised request" });
      } else {
        return Promise.resolve(user);
      }
    })
    .catch((e) => {
      throw "Unauthorised request";
    });
};

UserSchema.pre("save", function (next) {
  if (this.password) {
    this.password = CryptoJS.AES.encrypt(
      this.password,
      process.env.crypto_secret_key
    ).toString();
    next();
  } else {
    next();
  }
});

var User = mongoose.model("User", UserSchema);

module.exports = { User };
