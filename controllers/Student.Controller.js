const { decodeBase64 } = require('bcryptjs');
const StudentModel = require('../models/Student.Model')

exports.getCreateForm = (req, res, next) => {
    res.render('student/create', {
        title: "Tạo học sinh",
        layout: 'general',
      });
}

exports.getAll = async (req, res, next) => {
    let students = await StudentModel.selectAllStudents();
    for(let i = 0; i < students.length; i++) {
        students[i].NgaySinh = students[i].NgaySinh.toString("MMMM yyyy");
    }
    // handle NgaySinh
    res.render('student/all', {
        title: "Danh sách học sinh",
        layout: 'general',
        students,
    });
}

exports.getUpdateForm = (req, res, next) => {
    res.render('student/update', {
        title: "Cập nhật học sinh",
        layout: 'general',
    });
}

exports.create = async (req, res, next) => {
    // Kiểm tra -> Tạo thêm? -> Thông báo thành công/thất bại?
    // Chuyển hướng về student/all
    var student = {...req.body}
    const result = await StudentModel.selectOneStudentByID(student.MaSo);
    if(!result) {
        await StudentModel.createStudent(student);
        console.log("Successfully created")
    } else {
        console.log("Unsuccessfully created")
    }
    res.redirect("/student/all")
}

exports.update = (req, res, next) => {
    // Kiểm tra -> Cập nhật? -> Thông báo thành công/thất bại?
    // chuyển hướng về student/all
    res.send("PUT Okela")
}

exports.delete = async (req, res, next) => {

    console.log(req.params)
    const StudentID = req.params.id
    const result = await StudentModel.selectOneStudentByID(StudentID);
    if(result) {
        await StudentModel.deleteOneStudent(StudentID);
        console.log("Successfully deleted!")
    } else {
        console.log("Unsuccessfully deleted!")
    }

    res.redirect("/student/all")
}


