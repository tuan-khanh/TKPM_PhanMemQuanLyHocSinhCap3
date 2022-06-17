const TranscriptModel = require('../models/Transcript.Model');
const StudentModel = require('../models/Student.Model');
const ClassModel = require('../models/Class.Model');
const SubjectModel = require('../models/Subject.Model');

module.exports = {
    getSubjectReport: async (SubjectID, Term) => {
        var report = [];
        const classes = await ClassModel.selectAllClasses();
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
                const score = await TranscriptModel.selectOneRecordOfStudent(student.ID, SubjectID, Term, true);
                if(score.DTB > 5) {
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
                    if(score.DTB < 5) {
                        flag = false;
                        break;
                    }
                }
                if(flag) {
                    record.Dat ++;
                }
            }
            record.TiLe = (record.Dat / record.SiSo *100).toFixed(2);
            report.push(record);
        }
        return report;
    }
};
