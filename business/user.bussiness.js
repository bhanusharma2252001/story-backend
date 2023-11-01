const { sendOtp } = require("../utils/email");
const { User } = require("../models/user.model");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

const generateAuthToken = user => {
    return new Promise((resolve, reject) => {
        let token = jwt.sign({ _id: user._id.toString() }, "jwtkey").toString();
        resolve(token);
    });
};
const sendOTP = async (data) => {
  console.log("dataaaa", data);
  let OTP = Math.floor(1000 + Math.random() * 999).toString();
  console.log("OTP", OTP);

  let ciphertext = CryptoJS.AES.encrypt(OTP, "crytojskey").toString();

  const foundUser = await User.findOne({
    email: data.email,
    isEmailVerified: true,
  });

  if (foundUser) throw msg.duplicateEmail;
  let abc = await sendOtp({ toEmail: data.email, otp: OTP });

  if (abc) {
    let newDate = new Date();
    const updateUserdb = await User.findOneAndUpdate(
      { email: data.email },
      { $set: { otp: ciphertext, otpDate: newDate } },
      { upsert: true, new: true }
    );

    if (updateUserdb) {
      return {
        result: updateUserdb,
      };
    } else {
      throw "error while creating user";
    }
  }
};

const verifyOTP = async (data) => {
  if (!data.otp) {
    throw "otp required";
  }
  if (!data.email) {
    throw "email required";
  }
  let user = await User.findOne({ email: data.email });
  if (!user) throw msg.userNotFound;

  let date1 = user.otpDate;
  let date1Time = date1.getTime();
  let date2 = new Date();
  let date2Time = date2.getTime();
  let minutes = (date2Time - date1Time) / (1000 * 60);
  // console.log("minutes",minutes)
  if (minutes > 2) {
    throw msg.expireOtp;
  }
  const bytes = CryptoJS.AES.decrypt(user.otp, "crytojskey");
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  if (originalText == data.otp) {
    res = await User.findOneAndUpdate(
      { email: data.email },
      { $set: { active: true } },
      { new: true }
    );
    return {
      result: "verified",
    };
  } else {
    throw new Error("incorrect OTP");
  }
};

const register = async (data) => {
  const foundUser = await User.findOne({ email: data.email });
  if (!foundUser) {
    throw new Error("user not found");
  }
  data.password = data.password ? CryptoJS.AES.encrypt(data.password, "crytojskey").toString(): undefined ;
  const registeredUser = await User.findOneAndUpdate(
    { email: data.email },
    { $set: data }, { new : true }
  );
  if (registeredUser) return registeredUser;
  else throw new Error("something wrong happend!");
};

const login = async ( body ) => {
    let user = await User.findOne({
      email: body.email
    });
    if (!user ) throw new Error("user not found");
    const bytes = CryptoJS.AES.decrypt(user.password, "crytojskey").toString(CryptoJS.enc.Utf8);
    console.log("pasword",bytes);
    if (bytes !== body.password) throw "invalid Password"
    return {
      result: user,
      token: await generateAuthToken(user),
      message: "loggedIn"
    }
}

module.exports = {
  sendOTP,
  verifyOTP,
  register,
  login,
};
