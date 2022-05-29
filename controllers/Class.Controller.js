const ClassModel = require("../models/Class.Model");
const StudentModel = require("../models/Student.Model");
const date = require("date-and-time");
exports.getAll = async function (req, res, next) {
  let classes = await ClassModel.selectAllClasses();
  if (classes) {
    for (let i = 0; i < classes.length; i++) {
      const students = await StudentModel.selectAllStudentsByClass(
        classes[i].ID
      );
      classes[i].SiSo = students.length;
    }
  }
  res.render("class/all", {
    title: "All classes",
    layout: "general",
    classes: classes,
  });
};

exports.getOneClass = async function (req, res, next) {
  let Class = await ClassModel.selectOneClassByID(req.params.id);
  let students = await StudentModel.selectAllStudentsByClass(Class.ID);
  if (students) {
    Class.SiSo = students.length;
    for (let i = 0; i < students.length; i++) {
      students[i].NgaySinh = date.format(students[i].NgaySinh, "DD-MM-YYYY");
    }
  }
  res.render("class/detail", {
    title: `Lớp ${Class.Ten}`,
    layout: "general",
    class: Class,
    students: students,
  });
};

exports.getCreateForm = (req, res, next) => {
  res.render("class/create", {
    title: "Lập danh sách lớp",
    layout: "general",
  });
};


exports.getUpdateForm = async function (req, res, next) {};

exports.create = async function (req, res, next) {
  const ClassID = req.body.ClassID;
  const studentIds = req.body.students;
  for (const studentId of studentIds) {
    await StudentModel.updateClassOfStudent(studentId, ClassID);
  }
  res.redirect(`/class/${ClassID}`);
};

exports.update = async function (req, res, next) {};

exports.delete = async function (req, res, next) {};
