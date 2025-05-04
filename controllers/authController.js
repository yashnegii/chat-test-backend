import User from "../models/userSchema.js";
import jwt from "jsonwebtoken"

export const loginPostHandler = async (request, response) => {
  let data = await User.findOne({ email: request.body.email });
  // console.log(data);
  if (!data) {
    return response.status(404).json("User Not Found");
  } else if (request.body.password != data.password) {
    return response.status(401).json("login failed");
  } else { 
    const token = await jwt.sign({username: data.email}, process.env.JWT_TOKEN)
    response.cookie("jwt", token, {
      httpOnly: true, 
      maxAge: 24 * 60 * 60 * 1000, 
      sameSite: "lax", 
      secure: false, 
    });
    response.status(200).json({token: token, userId: request.body.email})
  };
};

export const signupPostHandler = async (request, response) => {
  try {
    const { email, password } = request.body;

    const exist = await User.exists({ email });

    if (!exist) {
      await User.create({ email : email, password: password }); // consider hashing password in production
      return response.status(200).json({ success: "signup success" });
    } else {
      return response.status(403).json({ message: "user already exists" });
    }
  } catch (error) {
    console.error("Signup error:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  }
};
