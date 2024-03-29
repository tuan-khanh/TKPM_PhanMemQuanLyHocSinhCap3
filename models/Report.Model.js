const TranscriptModel = require('../models/Transcript.Model');
const StudentModel = require('../models/Student.Model');
const ClassModel = require('../models/Class.Model');
const SubjectModel = require('../models/Subject.Model');
const axios = require('axios').default;

module.exports = {
    getSubjectReport: async (SubjectID, Term) => {
        var report = [];
        const classes = await ClassModel.selectAllClasses();
        let rules = await axios.get(`http://localhost:${process.env.PORT}/api/rule/all`, {params: {level: "short"}})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        rules = rules.data.rules
        for(const currentClass of classes) {
            let record = {}; // Save all records of the subject report.
            const students = await StudentModel.selectAllStudentsByClass(currentClass.ID);
            if(students.length <= 0) {
                continue;
            }
            record.TenLop = currentClass.Ten; // Get field name of the class
            record.SiSo = students.length;
            record.Dat = 0;
            var scores = [];
            for(const student of students) {
                const score = await TranscriptModel.selectOneRecordOfStudent(student.ID, SubjectID, Term, true);
                if(score.DTB >= rules.MinScore) {
                    scores.push(score);
                    record.Dat ++;
                }
            }
            record.TiLe = (record.Dat / record.SiSo *100).toFixed(2);
            report.push(record);
        }
        return report;
    },

    getTermReport: async (Term) => {
        var report = [];
        const classes = await ClassModel.selectAllClasses();
        const subjects = await SubjectModel.selectAllSubjects();
        let rules = await axios.get(`http://localhost:${process.env.PORT}/api/rule/all`, {params: {level: "short"}})
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        rules = rules.data.rules
        for(const currentClass of classes) {
            let record = {};
            const students = await StudentModel.selectAllStudentsByClass(currentClass.ID);
            if(students.length <= 0) {
                continue;
            }
            record.TenLop = currentClass.Ten;
            record.SiSo = students.length;
            record.Dat = 0;
            for(const student of students) {
                let flag = true;
                for(const subject of subjects) {
                    const score = await TranscriptModel.selectOneRecordOfStudent(student.ID, subject.ID, Term, true);
                    if(score.DTB < rules.MinScore) {
                        flag = false;
                        break;
                    }
                }
                if(flag) {
                    record.Dat ++;
                }
            }
            record.TiLe = (record.Dat / record.SiSo*100).toFixed(2);
            report.push(record);
        }
        return report;
    }
};
