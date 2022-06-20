const SubjectModel = require("../models/Subject.Model");
const StudentModel = require("../models/Student.Model");
const TranscriptModel = require("../models/Transcript.Model");
const axios = require("axios").default;

exports.default = (req, res, next) => {
  res.redirect("subject/all")
}

exports.getAll = async function (req, res, next) {
  let subjects = await SubjectModel.selectAllSubjects();
  res.status(200).render("subject/all", {
    title: "Quản lý môn học",
    layout: "general",
    subjects: subjects,
  });
};

exports.getCreateForm = (req, res, next) => {
  res.status(200).render("subject/create", {
    title: "Quản lý môn học",
    layout: "general",
  });
};

exports.getUpdateForm = async function (req, res, next) {
  const Subject = await SubjectModel.selectOneSubjectByID(req.params.id);
  if (Subject) {
    res.status(200).render("subject/update", {
      title: `Cập nhật môn ${Subject.Ten}`,
      layout: "general",
      subject: Subject,
      title: "Quản lý môn học",
    });
  } else {
    res.status(300).redirect("/subject/all");
  }
};

exports.create = async function (req, res, next) {
  const Subject = {
    MaBM: req.body.MaBM,
    Ten: req.body.Ten,
  };

  let exsistedSubject = await SubjectModel.selectOneSubjectByID(Subject.MaBM);
  if (!exsistedSubject) {
    await SubjectModel.createSubject(Subject);
    const currentSubject = await SubjectModel.selectSubjectBySubjectID(Subject.MaBM);
    const currentStudents = await StudentModel.selectAllStudents();
    for(const student of currentStudents) {
      await TranscriptModel.createNewOneRowByOneStudent(student.ID, currentSubject.ID, 1);
      await TranscriptModel.createNewOneRowByOneStudent(student.ID, currentSubject.ID, 2);
    }
    return res.status(200).redirect("/subject/all");
  }
  res.status(300).redirect(`/subject/all`);
};

exports.update = async function (req, res, next) {
  const SubjectID = req.params.id;
  const updatedSubject = {
    ID: req.params.id,
    MaBM: req.body.MaBM,
    Ten: req.body.Ten,
  };

  const currentSubject = await SubjectModel.selectOneSubjectByID(SubjectID);
  if (currentSubject.Ten != updatedSubject.Ten) {
      await SubjectModel.updateOneSubject(updatedSubject);
  }

  return res.redirect(`/subject/all`);
};

exports.delete = async function (req, res, next) {
  const SubjectID = req.params.id;
  const currentSubject = await SubjectModel.selectOneSubjectByID(SubjectID);
  if(currentSubject) {
    try {
      await TranscriptModel.deleteTranScriptOfOneSubject(SubjectID);
    } catch (err) {
      return res.status(300).json({
        success: false,
        message: err,
      })
    }

    try {
      await SubjectModel.deleteOneSubject(SubjectID);
    } catch (err) {
      return res.status(300).json({
        success: false,
        message: err,
      })
    } finally {
      return res.status(200).json({
        success: true,
        message: "Subject is deleted successfully"
      })
    }
  }
  return res.status(200).json({
    success: false,
    message: "Sucject is not found",
  });
};
