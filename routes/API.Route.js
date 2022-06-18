const router = require('express').Router();
const StudentModel = require('../models/Student.Model')
const ClassModel = require('../models/Class.Model')
const SubjectModel = require('../models/Subject.Model');
const Transcript = require('../models/Transcript.Model');
const TranscriptModel = require('../models/Transcript.Model');
const RuleModel = require('../models/Rule.Model');

// GET api/student/available/all
router.get('/student/available/all', async (req, res) => {
    let students = await StudentModel.selectAllAvailableStudent();
    res.status(200).json({
        students: students,
    });
})

// GET api/class/all
router.get('/class/all', async (req, res) => {
    let availableClasses = await ClassModel.selectAllClasses();
    if (availableClasses) {
        res.status(200).json({classes: availableClasses,});
    } else {
        res.send("Không còn lớp học");
    }
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

// GET /api/subject/all
router.get('/subject/all', async (req, res) => {
    let availableSubjects = await SubjectModel.selectAllSubjects();
    if (availableSubjects) {
        res.status(200).json({subjects: availableSubjects,});
    } else {
        res.send("Không còn môn học");
    }
})

// GET api/transcript
router.get("/transcript", async (req, res) => {
    let transcript = await TranscriptModel.selectFullTranscriptByConditions(req.query.class ,req.query.subject, req.query.term);
    res.status(200).json({
        transcript: transcript
    });
});

// GET /api/rule/all
router.get('/rule/all', async (req, res) => {
    let rules = await RuleModel.selectAll();
    var  specializedRules = {};
    
    if(rules) {
        for(const rule of rules) {
            rule.GiaTri = (rule.KieuDuLieu == "int") ? parseInt(rule.GiaTri) : parseFloat(rule.GiaTri).toFixed(2);
        }

        if(req.query.level == "short") {
            for(const rule of rules) {
                if(rule.ID == '1000') {
                    specializedRules.MaxNumberStudentsPerClass = rule.GiaTri;
                    continue;
                }
                if(rule.ID == '1001') {
                    specializedRules.MinAge = rule.GiaTri;
                    continue;
                }
                if(rule.ID == '1002') {
                    specializedRules.MaxAge = rule.GiaTri;
                    continue;
                }
                if(rule.ID == '1003') {
                    specializedRules.MinScore = rule.GiaTri;
                    continue;
                }
            }

            if(specializedRules) {
                // console.table(specializedRules)
                return res.status(200).json({
                    "rules": specializedRules,
                })
            }

        } else {
                for(const rule of rules) {

                }
                return res.status(200).json({
                    "rules": rules,
                })
            }
    }

    res.status(404).json({message: "Cant get all rules"});
});

//  POST /transcript/:id
router.put("/transcript/:id", async (req, res) => {
    console.log(req.params.id);
    const newScores = {...req.body};
    const currentScores = await TranscriptModel.selectOneRow(req.params.id);
    if(currentScores) {
        let flag = false;
        if(currentScores.Diem15Phut != newScores.d15p) {
            currentScores.Diem15Phut = newScores.d15p;
            flag = true;
        }
        if(currentScores.Diem1Tiet != newScores.d1t) {
            currentScores.Diem1Tiet = newScores.d1t;
            flag = true;
        }
        if(currentScores.DiemCuoiKy != newScores.dck) {
            currentScores.DiemCuoiKy = newScores.dck;
            flag = true;
        }
        if(flag) {
            console.log(newScores);
            await TranscriptModel.updateScores(currentScores);
        }
        return res.status(200).json({message: "Thanh cong"})
    }
    return res.status(200).json({message: "That bai"})

});

// DELETE api/class/:id
router.delete('/class/:id', async function(req, res) {
    const ClassID = req.params.id;
    let students = await StudentModel.selectAllStudentsByClass(ClassID);
    if (students) {
      for (const student of students) {
        await StudentModel.updateClassOfStudent(student.ID, null);
      }
    }
    res.status(200).json({message: "Successfully deleted"});
});



module.exports = router;