const StudentModel = require("../models/Student.Model");
const TranscriptModel = require("../models/Transcript.Model");
const ClassModel = require("../models/Class.Model");
const date = require("date-and-time");
const axios = require("axios");

exports.getCreateForm = (req, res, next) => {
  res.render("student/create", {
    title: "Quản lý học sinh",
    layout: "general",
  });
};

exports.getAll = async (req, res, next) => {
  let students = await StudentModel.selectAllStudents();
  if (students) {
    for (let student of students) {
      const shortTranscript = await TranscriptModel.selectTranscripByStudent(student.ID, true);
      student.Lop = student.LopID ? (await ClassModel.selectOneClassByID(student.LopID)).Ten : undefined;
      student.DTBHK1 = shortTranscript.DTBHK1;
      student.DTBHK2 = shortTranscript.DTBHK2;
    }
  }
  res.render("student/all", {
    title: "Quản lý học sinh",
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
      title: "Quản lý học sinh",
      layout: "general",
      student: student,
    });
  }
};

exports.create = async (req, res, next) => {
  var student = { ...req.body };
  let currentStudent = await StudentModel.selectOneStudentByStudentID(student.MaSo);
  if (!currentStudent) {
    let rules = await axios.get(`http://localhost:${process.env.PORT}/api/rule/all`, {params: {level: "short"}})
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
    const minAge = rules.data.rules.MinAge;
    const maxAge = rules.data.rules.MaxAge;
    let ngaySinh = new Date(student.NgaySinh);
    let current = new Date();
    if(current.getFullYear() - ngaySinh.getFullYear() >= minAge && current.getFullYear() - ngaySinh.getFullYear() <= maxAge) {
      await StudentModel.createStudent(student);
      currentStudent = await StudentModel.selectOneStudentByStudentID(student.MaSo);
      // console.log(currentStudent);
      let Transcript = await TranscriptModel.selectTranscripByStudent(currentStudent.ID);
      if(!Transcript.length) {
        await TranscriptModel.createTranscriptByOneStudent(currentStudent.ID);
        // console.log("successfully created transcript");
      }
      console.log("Successfully created");
    } else {
      console.log("Unsuccessfully created");
    }
  }
  res.redirect("/student/all");
};

exports.update = async (req, res, next) => {
  var student = { ...req.body };
  student["ID"] = parseInt(req.params.id);
  console.log(student);
  let rules = await axios.get(`http://localhost:${process.env.PORT}/api/rule/all`, {params: {level: "short"}})
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
  const minAge = rules.data.rules.MinAge;
  const maxAge = rules.data.rules.MaxAge;
  let ngaySinh = new Date(student.NgaySinh);
  let current = new Date();
  if(current.getFullYear() - ngaySinh.getFullYear() >= minAge && current.getFullYear() - ngaySinh.getFullYear() <= maxAge) {
    const currentStudent = await StudentModel.selectOneStudentByID(student.ID);
    if (currentStudent) {
      const response = await StudentModel.updateOneStudent(student);
      console.log("Successfully Update Student");
    }
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
    res.status(200).json({
      success: true,
      message: "Deleted student successfully.",
    });
  } else {
    console.log("Unsuccessfully deleted!");
    res.status(300).json({
      success: false,
      message: "Deleting student is failed.",
    });
  }

};
