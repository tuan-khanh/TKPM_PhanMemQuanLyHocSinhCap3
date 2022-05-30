const db = require("./index");

const tableName = "HocSinh";

module.exports = {
    selectAllStudents: async () => {
        return await db.selectAll(tableName);
    },

    selectOneStudentByID: async (StudentID) => {
        return await db.selectOne(tableName, "MaSo", StudentID)
    },

    selectAllStudentsByName: async (Name) => {
        return await db.selectAll(tableName, "HoTeb", Name);
    },

    selectAllStudentsByClass: async (ClassID) => {
        return await db.selectAll(tableName, "LopID", ClassID);
    },

    selectAllAvailableStudent: async () => {
        return await db.selectAll(tableName, "LopID", null);
    },

    createStudent: async (student) => {
        return await db.save(tableName, student);
    },

    deleteOneStudent: async (StudentID) => {
        return await db.delete(tableName, "MaSo", StudentID);
    },

    updateOneStudent: async (student) => {
        return await db.updateAll(tableName, "MaSo",student.MaSo, student);
    },

    updateClassOfStudent: async (StudentID, LopID) => {
        return await db.update(tableName, "MaSo", StudentID, "LopID", LopID);
    }

};
