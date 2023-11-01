const { sendOTP, verifyOTP, register, login } = require("../business/user.bussiness");

exports.sendOTP = async (req, res) => await sendOTP(req.body);
exports.verifyOTP = async ( req, res) => await verifyOTP(req.body);
exports.register = async ( req, res) => await register(req.body);
exports.login = async ( req, res) => await login(req.body);

