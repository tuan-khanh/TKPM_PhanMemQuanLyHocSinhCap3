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
            record.TenLop = currentClass.Ten;
            const students = await StudentModel.selectAllStudentsByClass(currentClass.ID);
            record.SiSo = students.length;
            record.Dat = 0;
            for(const student of students) {
                const row = await TranscriptModel.selectOneRecordOfStudent(student.ID, SubjectID, Term, true);
                if(row.DTB > 5) {
                    record.Dat ++;
                }
            }
            record.TiLe = record.Dat / record.SiSo;
            report.push(record);
        }
        return report;
    },

    getTermReport: async (Term) => {

    }
};
