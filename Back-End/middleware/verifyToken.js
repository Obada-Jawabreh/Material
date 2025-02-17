const jwt = require("jsonwebtoken");
require("dotenv").config();

const VerifySignupToken = (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token is required." });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded token:", user);

    req.userId = user.id;
    req.email = user.email;
    next();
  } catch (error) {
    console.error("Token verification error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).send(`
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: red;">The signup link has expired</h1>
            <p>Please try again.</p>
          </body>
        </html>
      `);
    } else {
      return res.status(400).json({ message: "Invalid token." });
    }
  }
};

module.exports = VerifySignupToken;
