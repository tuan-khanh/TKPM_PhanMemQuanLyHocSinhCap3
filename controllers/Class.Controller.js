const ClassModel = require("../models/Class.Model");
const StudentModel = require("../models/Student.Model");
const SubjectModel = require("../models/Subject.Model");
const TranscriptModel = require("../models/Transcript.Model");
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
  let studentIds = req.body.students;
  if (typeof studentIds != "object") {
    studentIds = [studentIds];
  }
  for (const studentId of studentIds) {
    await StudentModel.updateClassOfStudent(studentId, exsistedClass.ID);
    await TranscriptModel.createTranscriptByOneStudent(studentId);
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
    const currentStudents = await StudentModel.selectAllStudentsByClass(ClassID);

    if (currentStudents.length) {
      console.log("Lop da co hoc sinh")

      // get new student
      for (const ID of studentIDs) {
        let existed = currentStudents.filter((s) => s.ID == ID);
        if (!existed.length) {
          await StudentModel.updateClassOfStudent(ID, ClassID);
        }
      }

      // remove old student
      for (const student of currentStudents) {
        let existed = studentIDs.filter((id) => id == student.ID);
        if (!existed.length) {
          await StudentModel.updateClassOfStudent(student.ID, null);
        }
      }
    } else {
      console.log("Lop chua co hoc sinh")
      for (const studentID of studentIDs) {
        await StudentModel.updateClassOfStudent(studentID, ClassID);
      }
    }
  } else {
    const response = await axios.delete(`http://localhost:${process.env.PORT}/api/class/${ClassID}`)
      .catch(function (error) {
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
          }
          console.log(error.config);
      });
  }

  return res.redirect(`/class/${ClassID}`);
};

exports.delete = async function (req, res, next) {
  const ClassID = req.params.id;
  let students = await StudentModel.selectAllStudentsByClass(ClassID);
  console.table(students)
  try {
    if (students.length) {
      for (const student of students) {
        await StudentModel.updateClassOfStudent(student.ID, null);
      }
    }
  } finally {
    console.log("DELETE CLASS");
    await ClassModel.deleteOneClass(ClassID);
  }

  res.redirect("/class/all");
};
