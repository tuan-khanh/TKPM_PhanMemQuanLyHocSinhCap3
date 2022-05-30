const { decodeBase64 } = require("bcryptjs");
const StudentModel = require("../models/Student.Model");
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
    for (let i = 0; i < students.length; i++) {
      students[i].NgaySinh = date.format(students[i].NgaySinh, "DD-MM-YYYY");
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
  // Kiểm tra -> Tạo thêm? -> Thông báo thành công/thất bại?
  // Chuyển hướng về student/all
  var student = { ...req.body };
  const result = await StudentModel.selectOneStudentByID(student.MaSo);
  if (!result) {
    await StudentModel.createStudent(student);
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
  const result = await StudentModel.selectOneStudentByID(StudentID);
  if (result) {
    await StudentModel.deleteOneStudent(StudentID);
    console.log("Successfully deleted!");
  } else {
    console.log("Unsuccessfully deleted!");
  }

  res.redirect("/student/all");
};
