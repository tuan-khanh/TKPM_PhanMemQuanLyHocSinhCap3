const ClassModel = require("../models/Class.Model");
const StudentModel = require("../models/Student.Model");
const date = require("date-and-time");
const axios = require("axios").default;
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
  var students = await StudentModel.selectAllStudentsByClass(Class.ID);
  console.log(students.length);
  Class.SiSo = students.length;
  if (students) {
    for (let i = 0; i < students.length; i++) {
      students[i].NgaySinh = date.format(students[i].NgaySinh, "DD-MM-YYYY");
    }
  }
  res.setHeader("Content-Type", "text/html")
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

exports.getUpdateForm = async function (req, res, next) {
  const Class = await ClassModel.selectOneClassByID(req.params.id);
  if (Class) {
    const students = await StudentModel.selectAllStudentsByClass(Class.ID);
    res.render("class/update", {
      title: `Cập nhật lớp ${Class.Ten}`,
      layout: "general",
      students: students,
      class: Class,
    });
  } else {
    res.redirect("/class/all");
  }
};

exports.create = async function (req, res, next) {
  const Class = {
    Ten: req.body.Ten,
    Khoi: req.body.Khoi,
  };

  let exsistedClass = await ClassModel.selectOneClassByName(Class.Ten);
  if (!exsistedClass) {
    await ClassModel.createClass(Class);
  }
  exsistedClass = await ClassModel.selectOneClassByName(Class.Ten);
  const studentIds = req.body.students;
  if (typeof studentIds != "object") {
    studentIds = [studentIds];
  }
  for (const studentId of studentIds) {
    await StudentModel.updateClassOfStudent(studentId, exsistedClass.ID);
  }
  res.redirect(`/class/${exsistedClass.ID}`);
};

exports.update = async function (req, res, next) {
  const ClassID = req.params.id;
  let studentIDs = req.body.students;
  if (studentIDs) {
    if (typeof studentIDs != "object") {
      studentIDs = [studentIDs];
    }
    console.log(studentIDs.length);
    const currentStudents = await StudentModel.selectAllStudentsByClass(
      ClassID
    );
    console.log(currentStudents.length);
    if (currentStudents.length) {
      for (const id of studentIDs) {
        const existed = currentStudents.some((s) => s.MaSo == id);
        if (!existed) await StudentModel.updateClassOfStudent(id, ClassID);
      }

      for (const student of currentStudents) {
        const existed = studentIDs.some((id) => id == student.MaSo);
        if (!existed)
          await StudentModel.updateClassOfStudent(student.MaSo, null);
      }
    } else {
      for (const studentID of studentIDs) {
        await StudentModel.updateClassOfStudent(studentID, ClassID);
      }
    }
  } else {
    console.log("Xoa het");
    const response = await axios.delete(
      `http://localhost:${process.env.PORT}/api/class/${ClassID}`
    );
  }

  return res.redirect(`/class/${ClassID}`);
};

exports.delete = async function (req, res, next) {
  const ClassID = req.params.id;
  let students = await StudentModel.selectAllStudentsByClass(ClassID);
  if (students) {
    for (const student of students) {
      await StudentModel.updateClassOfStudent(student.MaSo, null);
    }
  }
  console.log("DELETE CLASS");
  await ClassModel.deleteOneClass(ClassID);

  res.redirect("/class/all");
};
