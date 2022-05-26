const express = require("express");
var StudentRouter = require("./Student.Route");

module.exports = function(app) {
  app.use(express.json());

  app.use("/student", StudentRouter);
};