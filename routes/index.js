const express = require("express");
var StudentRouter = require("./Student.Route");
var ClassRouter = require("./Class.Route");
var APIRouter = require("./API.Route");

module.exports = function(app) {
  app.use(express.json());
  app.use("/student", StudentRouter);
  app.use("/class", ClassRouter);
  app.use("/api", APIRouter);
};