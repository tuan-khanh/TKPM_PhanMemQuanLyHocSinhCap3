const { decodeBase64 } = require("bcryptjs");
const StudentModel = require("../models/Student.Model");
const TranscriptModel = require("../models/Transcript.Model");
const date = require("date-and-time");

exports.getCreateForm = (req, res, next) => {
  res.render("student/create", {
    title: "Tạo học sinh",
    layout: "general",
  });
};

exports.getAll = async (req, res, next) => {
  let students = await StudentModel.selectAllStudents();
  if (students) {
    // Handle Date to short date
    for (let student of students) {
      student.NgaySinh = date.format(student.NgaySinh, "DD-MM-YYYY");
      const shortTranscript = await TranscriptModel.selectTranscripByStudent(student.ID, true);
      student.DTBHK1 = shortTranscript.DTBHK1;
      student.DTBHK2 = shortTranscript.DTBHK2;
    }
  }
  res.render("student/all", {
    title: "Danh sách học sinh",
    layout: "general",
    students: students,
  });
};

exports.getUpdateForm = async (req, res, next) => {
  const StudentID = req.params.id;
  var student = await StudentModel.selectOneStudentByID(StudentID);
  if (student) {
    student.NgaySinh = date.format(student.NgaySinh, "YYYY-MM-DD");
    res.render("student/update", {
      title: "Cập nhật học sinh",
      layout: "general",
      student: student,
      title: "Update Student",
    });
  }
};

exports.create = async (req, res, next) => {
  var student = { ...req.body };
  let currentStudent = await StudentModel.selectOneStudentByStudentID(student.MaSo);
  if (!currentStudent) {
    await StudentModel.createStudent(student);
    currentStudent = await StudentModel.selectOneStudentByStudentID(student.MaSo);
    console.log(currentStudent);
    let Transcript = await TranscriptModel.selectTranscripByStudent(currentStudent.ID);
    if(!Transcript.length) {
      await TranscriptModel.createTranscriptByOneStudent(currentStudent.ID);
      console.log("successfully created transcript");
    }
    console.log("Successfully created");
  } else {
    console.log("Unsuccessfully created");
  }
  res.redirect("/student/all");
};

exports.update = async (req, res, next) => {
  var student = { ...req.body };
  const result = await StudentModel.selectOneStudentByID(student.MaSo);
  if (result) {
    try {
      const response = await StudentModel.updateOneStudent(student);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
    } catch (err) {
      console.error(`Could not get products: ${error}`);
    }
    console.log("Successfully Update Student");
  } else {
    console.log("Unsuccessfully Update Student");
  }
  res.redirect("/student/all");
};

exports.delete = async (req, res, next) => {
  const StudentID = req.params.id;
  const currentStudent = await StudentModel.selectOneStudentByID(StudentID);
  if (currentStudent) {
    const Transcript = await TranscriptModel.selectTranscripByStudent(currentStudent.ID);
    if(Transcript) {
      await TranscriptModel.deleteTranScriptOfOneStudent(currentStudent.ID);
      console.log("successfully deleted transcript");
    }
    await StudentModel.deleteOneStudent(currentStudent.ID);

    console.log("Successfully deleted!");
  } else {
    console.log("Unsuccessfully deleted!");
  }

  res.redirect("/student/all");
};
