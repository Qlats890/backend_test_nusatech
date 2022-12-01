require("dotenv").config();

const express = require("express");

const Router = require("./src/routers");
const db = require("./src/config/dbConnection");

const PORT = process.env.PORT | 3123;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", Router);

app.use((req, res, next) => {
  res.status(200).json({
    data: "404 - Not Found!",
  });
});

app.listen(PORT, async () => {
  try {
    await db.authenticate();
    console.log("Connected in ", PORT);
  } catch (error) {
    console.log("Failed connect to database");
  }
});
