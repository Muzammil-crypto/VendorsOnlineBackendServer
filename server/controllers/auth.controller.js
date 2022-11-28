const User = require("../models/user.model");

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      const isMatch = await user.comparePassword(password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Wrong password",
        });
      }

      const token = await user.generateToken();

      // set token to httpOnly cookie and set maxAge to 1 year
      res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
      });

      const userData = user.toJSON();

      return res.status(200).json({
        // message: 'Login successful',
        data: {
          user: {
            _id: userData._id,
            name: userData.name,
          },
          token,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async register(req, res) {
    console.log(req.body);
    const { name, email, password, is18Plus } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.status(409).json({
          message: "User already exists",
        });
      }

      const newUser = new User({
        name,
        email,
        password,
        is18Plus,
      });

      const savedUser = await newUser.save();

      return res.status(201).json({
        message: "Registered successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async logout(req, res) {
    res.clearCookie("token");

    return res.status(200).json({
      // message: 'Logout successful',
    });
  }

  static async getCurrentUser(req, res) {
    const user = req.user;

    return res.status(200).json({
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
        },
      },
    });
  }
}

module.exports = AuthController;
