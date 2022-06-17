const db = require("./index");

const tableName = "MonHoc";

module.exports = {
    selectAllSubjects: async () => {
        return await db.selectAll(tableName);
    },

    selectOneSubjectByID: async (SubjectID) => {
        return await db.selectOne(tableName, "ID", SubjectID)
    },

    selectAllSubjectByName: async (Name) => {
        return await db.selectAll(tableName, "Ten", Name);
    },

    createSubject: async (subject) => {
        return await db.save(tableName, subject);
    },

    deleteOneSubject: async (SubjectID) => {
        return await db.delete(tableName, "MaBM", SubjectID);
    },

    updateOneSubject: async (subject) => {
        return await db.updateAll(tableName, "MaBM",subject.MaBM, subject);
    },
};
