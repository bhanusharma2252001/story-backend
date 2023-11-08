const { User } = require("../models/user.model");
exports.authenticate = async (req, res, next) => {
  try {
    const auth = req.header("Authorization");
    if (!auth) throw "Unauthorized Request";
    const token = auth.substr(auth.indexOf(" ") + 1);
    const user = await User.findByToken(token, res);
    req.user = user;
    if (!user) throw "Unauthorized Request";
    return next();
  } catch (err) {
    return res.status(401).send(err);
  }
};
