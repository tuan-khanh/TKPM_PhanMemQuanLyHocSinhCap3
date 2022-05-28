const db = require("./index");

const tableName = "HocSinh";

module.exports = {
    selectAllStudents: async () => {
        return await db.selectAll(tableName);
    },

    selectOneStudentByID: async (StudentID) => {
        return await db.selectOne(tableName, "MaSo", StudentID)
    },

    createStudent: async (student) => {
        return await db.save(tableName, student);
    },

    deleteOneStudent: async (StudentID) => {
        return await db.delete(tableName, "MaSo", StudentID);
    },

    updateOneStudent: async (student) => {
        return await db.update(tableName, "MaSo",student.MaSo, student);
    }

};
