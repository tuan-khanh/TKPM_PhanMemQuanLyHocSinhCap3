const express = require("express");
var StudentRouter = require("./Student.Route");
var ClassRouter = require("./Class.Route");
var APIRouter = require("./API.Route");
var SubjectRouter = require("./Subject.Route");
var TranscriptRouter = require("./Transcript.Route");
module.exports = function(app) {
  app.use(express.json());
  app.use("/student", StudentRouter);
  app.use("/class", ClassRouter);
  app.use("/api", APIRouter);
  app.use("/subject", SubjectRouter);
  app.use("/transcript", TranscriptRouter);
};