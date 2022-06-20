const db = require("./index");

const tableName = "Lop";

module.exports = {
    selectAllClasses: async () => {
        return await db.selectAll(tableName, null, null, "Ten", false);
    },

    selectOneClassByID: async (ClassID) => {
        return await db.selectOne(tableName, "ID", ClassID)
    },

    selectOneClassByName: async (ClassName) => {
        return await db.selectOne(tableName, "Ten", ClassName)
    },

    createClass: async (Class) => {
        return await db.save(tableName, Class);
    },

    deleteOneClass: async (ClassID) => {
        return await db.delete(tableName, "ID", ClassID);
    },

    updateOneClass: async (Class) => {
        return await db.updateAll(tableName, "ID",Class.ID, Class);
    },

    updateNameOfOneClass: async (newClass) => {
        return await db.update(tableName, "ID",newClass.ID, "Ten", newClass.Ten);
    }

};
