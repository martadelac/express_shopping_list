const express = require("express");
const app = express();
const itemsRoutes = require("./items");

const ExpressError = require("./expressError");

app.use(express.json());
app.use("/items", itemsRoutes);

app.get("/favicon.ico", (req, res) => res.sendStatus(204));

/** 404 handler */

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});



module.exports = app;
