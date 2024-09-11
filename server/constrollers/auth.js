import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.status(403).json({ message: "Username already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, password: hash });

    await newUser.save();

    res.json({ newUser, message: "Registration Successfully" });
  } catch (error) {
    res.json({ message: "Error during registration" });
  }
};

//Login

export const login = async (req, res) => {
  try {
  } catch (error) {}
};

//Get Me

export const getMe = async (req, res) => {
  try {
  } catch (error) {}
};
