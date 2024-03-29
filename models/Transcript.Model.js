const db = require("./index");
const SubjectModel = require("./Subject.Model");
const StudentModel = require("./Student.Model");
const tableName = "BangDiem";

module.exports = {
    selectAll: async () => {
        return await db.selectAll(tableName);
    },

    selectOneRow: async (ID) => {
        return await db.selectOne(tableName, "ID", ID)
    },

    selectFullTranscriptByConditions: async (ClassID, SubjectID, Term, short) => {
        const students = await StudentModel.selectAllStudentsByClass(ClassID);
        var result = [];
        if(short) {
            let record = {};
            for(const student of students) {
                const row = await db.selectAllByMultipleConditions(tableName, ["MonHocID", "HocKy", "HocSinhID"], [SubjectID, Term, student.ID]);
                record.HoTen = student.HoTen;
                record.TrungBinh = (1*row[0].Diem15Phut + 2*row[0].Diem1Tiet + 3*row[0].DiemCuoiKy)/(1+2+3);
                result.push(record);
            }
        } else {
            for(const student of students) {
                const row = await db.selectAllByMultipleConditions(tableName, ["MonHocID", "HocKy", "HocSinhID"], [SubjectID, Term, student.ID])
                row[0].HoTen = student.HoTen;
                result.push(row[0]);
            }
        }

        return result;
    },

    selectTranscripByStudent: async (StudentID, short) => {
        const fullTranscript = await db.selectAll(tableName, "HocSinhID", StudentID);
        if(short) {
            return {
                "ID": StudentID,
                "DTBHK1": () => {
                    const TranscriptOfTerm1 = fullTranscript.filter(t => t.HocKy == 1)
                    // console.table(TranscriptOfTerm1)
                    let total = 0;
                    for(const row of TranscriptOfTerm1) {
                        total += (1*row.Diem15Phut + 2*row.Diem1Tiet + 3*row.DiemCuoiKy)/(1+2+3);
                    }
                    return (total / TranscriptOfTerm1.length).toFixed(2);
                },
                "DTBHK2": () => {
                    const TranscriptOfTerm2 = fullTranscript.filter(t => t.HocKy == 2)
                    let total = 0;
                    for(const row of TranscriptOfTerm2) {
                        total += (1*row.Diem15Phut + 2*row.Diem1Tiet + 3*row.DiemCuoiKy)/(1+2+3);
                    }
                    return (total / TranscriptOfTerm2.length).toFixed(2);
                },
            }
        }
        return fullTranscript;
    },

    selectOneRecordOfStudent: async(StudentID, SubjectID, Term, short) => {
        let record = await db.selectAllByMultipleConditions(tableName, ["MonHocID", "HocSinhID", "HocKy"], [SubjectID, StudentID, Term]);
        record = record[0];
        if(short) {
            return {
                "ID": record.ID,
                "HocSinhID": record.HocSinhID,
                "DTB": ((1*record.Diem15Phut + 2*record.Diem1Tiet + 3*record.DiemCuoiKy)/(1+2+3)).toFixed(2),
            }
        } else
            return record;
    },

    selectTranscriptByTerm: async (term) => {
        return await db.selectAll(tableName, "HocKy", term);
    },

    selectTranscriptBySubject: async (SubjectID) => {
        return await db.selectAll(tableName, "MonHocID", SubjectID);
    },
    
    createNewOneRowByOneStudent: async (studentID, subjectID, term) => {
        const row = {
            "HocKy": term,
            "MonHocID": subjectID,
            "HocSinhID": studentID,
            "Diem15Phut": 0,
            "Diem1Tiet": 0,
            "DiemCuoiKy": 0,
        }
        return await db.save(tableName, row);
    },

    createTranscriptByOneStudent: async (studentID) => {
        const subjects = await SubjectModel.selectAllSubjects();
        for(const subject of subjects) {
            await module.exports.createNewOneRowByOneStudent(studentID, subject.ID, 1);
            await module.exports.createNewOneRowByOneStudent(studentID, subject.ID, 2);
        }
    },

    deleteTranScriptOfOneStudent: async (StudentID) => {
        return await db.delete(tableName, "HocSinhID", StudentID);
    },

    deleteTranScriptOfOneSubject: async (SubjectID) => {
        return await db.delete(tableName, "MonHocID", SubjectID);
    },

    updateScores: async (newScore) => {
        return await db.updateAll(tableName, "ID",newScore.ID, newScore);
    },

    setDefaultTranscriptOfOneStudent: async (StudentID) => {
        const allTranscript = await module.exports.selectTranscripByStudent(StudentID, false);
        for(let record of allTranscript) {
            record.Diem15Phut = 0;
            record.Diem1Tiet = 0;
            record.DiemCuoiKy = 0;
            await module.exports.updateScores(record);
        }
        return;
    },
};
