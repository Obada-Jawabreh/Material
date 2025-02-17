const { User } = require("../../models/index");
const sequelize = require("../../config/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const validator = require("validator");
const fs = require("fs");
const path = require("path");

// ----------------------------------------------------------------------
const register = async (req, res) => {
  const userData = req.body;
  if (
    !userData.email?.trim() ||
    !userData.password?.trim() ||
    !userData.confirm_password?.trim() ||
    !userData.first_name?.trim() ||
    !userData.last_name?.trim()
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userCount = await User.count({ where: { email: userData.email } });
  if (userCount > 0) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  if (!validator.isEmail(userData.email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // const passwordOptions = {
  //   minLength: 8,
  //   minLowercase: 1,
  //   minUppercase: 1,
  //   minNumbers: 1,
  //   minSymbols: 1,
  // };

  // if (!validator.isStrongPassword(userData.password, passwordOptions)) {
  //   return res.status(400).json({
  //     message:
  //       "Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.",
  //   });
  // }

  if (userData.password !== userData.confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  if (!validator.isAlpha(userData.first_name.trim())) {
    return res
      .status(400)
      .json({ message: "First name must contain only letters" });
  }

  if (!validator.isAlpha(userData.last_name.trim())) {
    return res
      .status(400)
      .json({ message: "Last name must contain only letters" });
  }

  const transaction = await sequelize.transaction();
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [user, created] = await User.upsert(
      {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: hashedPassword,
      },
      { transaction, returning: true }
    );

    await transaction.commit();
    res.status(200).json({ message: "Data processed successfully." });
  } catch (error) {
    await transaction.rollback();
    console.error("Error processing the data:", error);
    res.status(500).json({ error: "Error processing the data." });
  }
};
// --------------------------loginUser------------------------------------
const loginUser = async (req, res) => {
  try {
    const { password, email, rememberMe } = req.body;
    if (!password && !email) {
      return res.status(401).json({ error: "email and password are required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const tokenExpiration = rememberMe === true ? "10d" : "12h";

    const token = jwt.sign(
      { id: user.id, user_type: user.user_type },
      process.env.JWT_SECRET,
      {
        expiresIn: tokenExpiration,
      }
    );

    res.json({
      token,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      expiresIn: tokenExpiration,
      profile_img: user.profile_img,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  register,
  loginUser,
};
