const TranscriptModel = require("../models/Transcript.Model");

exports.default = (req, res, next) => {
    res.render('transcript/default', {
        title: "Bảng điểm môn học",
        layout: "general",
    });
};