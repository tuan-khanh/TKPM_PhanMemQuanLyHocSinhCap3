const db = require("./index");

const tableName = "MonHoc";

module.exports = {
    selectAllSubjects: async () => {
        return await db.selectAll(tableName, null, null, "MaBM", false);
    },

    selectOneSubjectByID: async (SubjectID) => {
        return await db.selectOne(tableName, "ID", SubjectID)
    },

    selectSubjectBySubjectID: async (SubjectID) => {
        return await db.selectOne(tableName, "MaBM", SubjectID);
    },

    selectAllSubjectByName: async (Name) => {
        return await db.selectAll(tableName, "Ten", Name);
    },

    createSubject: async (subject) => {
        return await db.save(tableName, subject);
    },

    deleteOneSubject: async (SubjectID) => {
        return await db.delete(tableName, "ID", SubjectID);
    },

    updateOneSubject: async (subject) => {
        return await db.updateAll(tableName, "ID",subject.ID, subject);
    },
};
