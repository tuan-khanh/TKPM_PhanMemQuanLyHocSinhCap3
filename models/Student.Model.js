const db = require("./index");

const tableName = "HocSinh";

module.exports = {
    selectAllStudents: async () => {
        return await db.selectAll(tableName, null, null, "MaSo", false);
    },

    selectOneStudentByID: async (ID) => {
        return await db.selectOne(tableName, "ID", ID)
    },

    selectOneStudentByStudentID: async (StudentID) => {
        return await db.selectOne(tableName, "MaSo", StudentID)
    },

    selectAllStudentsByName: async (Name) => {
        return await db.selectAll(tableName, "HoTen", Name);
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
        return await db.delete(tableName, "ID", StudentID);
    },

    updateOneStudent: async (student) => {
        return await db.updateAll(tableName, "MaSo",student.MaSo, student);
    },

    updateClassOfStudent: async (StudentID, LopID) => {
        return await db.update(tableName, "ID", StudentID, "LopID", LopID);
    }
};
