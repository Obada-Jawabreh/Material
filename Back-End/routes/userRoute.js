const express = require("express");
const router = express.Router();

const authController = require("../controllers/userController/authUser");

// const ManageController = require("../controllers/userController/manageUser");

const auth = require("./../middleware/authMiddleware");
const upload = require("./../config/multer-config");

router.post("/register", authController.register);
router.post("/login", authController.loginUser);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
