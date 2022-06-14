const SubjectModel = require("../models/Subject.Model");
const axios = require("axios").default;
exports.getAll = async function (req, res, next) {
  let subjects = await SubjectModel.selectAllSubjects();
  res.render("subject/all", {
    title: "Danh sách các môn học",
    layout: "general",
    subjects: subjects,
  });
};

exports.getCreateForm = (req, res, next) => {
  res.render("subject/create", {
    title: "Thêm môn học mới",
    layout: "general",
  });
};

exports.getUpdateForm = async function (req, res, next) {
  const Subject = await SubjectModel.selectOneSubjectByID(req.params.id);
  console.log(Subject);
  if (Subject) {
    res.render("subject/update", {
      title: `Cập nhật lớp ${Subject.Ten}`,
      layout: "general",
      subject: Subject,
    });
  } else {
    res.redirect("/subject/all");
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
  }
  res.redirect(`/subject/all`);
};

exports.update = async function (req, res, next) {
  const SubjectID = req.params.id;
  const updatedSubject = {
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
  await SubjectModel.deleteOneSubject(SubjectID);

  res.redirect("/subject/all");
};
