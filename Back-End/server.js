require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT || 8001;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const cors = require("cors");
const path = require("path");
const colors = require("colors");

app.use(cors({ origin: "*", credentials: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("<h1> Server Works Good! </h1>");
});

const userRoute = require("./routes/userRoute");
app.use("/api/user", userRoute);

const materialRoute = require("./routes/materialRoute");
app.use("/api/material", materialRoute);
app.listen(PORT, () => {
  console.log(colors.bgGreen(`Server is running on http://localhost:${PORT} `));
});
