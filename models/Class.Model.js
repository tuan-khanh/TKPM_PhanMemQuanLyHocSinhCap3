const db = require("./index");

const tableName = "Lop";

module.exports = {
    selectAllClass: async () => {
        return await db.selectAll(tableName);
    },

    selectOneClassByID: async (ClassID) => {
        return await db.selectOne(tableName, "ID", ClassID)
    },

    createClass: async (Class) => {
        return await db.save(tableName, Class);
    },

    deleteOneClass: async (ClassID) => {
        return await db.delete(tableName, "ID", ClassID);
    },

    updateOneClass: async (Class) => {
        return await db.update(tableName, "ID",Class.ID, Class);
    }

};