const db = require('./index');

const tableName = "QuyDinh";

module.exports= {
    selectAll: async () => {
        return await db.selectAll(tableName);
    },

    selecOneRule: async (RuleID) => {
        return await db.selectOne(tableName, "ID", RuleID)
    },

    updateOneRule: async (newRule) => {
        return await db.update(tableName, "ID",newRule.ID, "GiaTri", newRule.GiaTri);
    },
}