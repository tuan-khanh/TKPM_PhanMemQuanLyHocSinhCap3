const router = require('express').Router();
const StudentModel = require('../models/Student.Model')
const ClassModel = require('../models/Class.Model')
const MaxNumberStudentsPerClass = 40;

// GET api/student/available/all
router.get('/student/available/all', async (req, res) => {
    let students = await StudentModel.selectAllAvailableStudent();
    res.status(200).json({
        students: students,
    });
})

// GET api/class/available/all
router.get('/class/available/all', async (req, res) => {
    let classes = await ClassModel.selectAllClasses();
    let availableClasses = classes.filter(checkAvailable);
    if (availableClasses) {
        res.status(200).json({classes: availableClasses,});
    } else {
        res.send("Không còn chỗ học");
    }
    async function checkAvailable(c) {
        const students = await StudentModel.selectAllStudentsByClass(c.ID);
        return students.length < MaxNumberStudentsPerClass;
    };
})

// DELETE api/class/:id
router.delete('/class/:id', async function(req, res) {
    const ClassID = req.params.id;
    let students = await StudentModel.selectAllStudentsByClass(ClassID);
    if (students) {
      for (const student of students) {
        await StudentModel.updateClassOfStudent(student.MaSo, null);
      }
    }
    res.status(200).json({message: "Successfully deleted"});
})

module.exports = router