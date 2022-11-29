const { decode } = require("../utils/jwt.utils");

const deserializeUser = async (req, res, next) => {
  // get token from cookie
  console.log("okokkookko");
  var token = req.cookies.token;
  if (!token) {
    token = req.headers["authorization"]?.split(" ")[1];
  }

  // console.log(req.cookies);

  if (!token) return next();

  const { valid, expired, decoded } = decode(token);
  console.log(decoded);

  if (!valid) {
    res.clearCookie("token");

    return next();
  }

  if (expired) {
    res.clearCookie("token");

    return next();
  }

  req.user = decoded;

  next();
};

module.exports = deserializeUser;
