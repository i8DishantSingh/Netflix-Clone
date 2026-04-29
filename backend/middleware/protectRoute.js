import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt"];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access: no cookie found",
      });
    }

    // Use consistent variable naming
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Make sure your JWT payload actually has "userId"
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access: No user found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

export default protectRoute;
