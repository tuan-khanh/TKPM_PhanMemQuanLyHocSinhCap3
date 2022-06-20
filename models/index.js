const pgp = require("pg-promise")({
  capSQL: true,
});
const schema = "public";
const connection = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASWWORD,
  port: process.env.PGPORT,
};

const db = pgp(connection);

exports.selectAll = async (TableName, FieldName, Value, orderByField, desc = true) => {
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  if(FieldName && Value) {
    if(orderByField) {
      var query = pgp.as.format(`SELECT * FROM $1 WHERE "${FieldName}" = '${Value}' ORDER BY "${orderByField}" ${desc ? 'DESC' : 'ASC'}`, table);
    } else {
      var query = pgp.as.format(`SELECT * FROM $1 WHERE "${FieldName}" = '${Value}'`, table);
    }
  } else if(FieldName && Value == null) {
    if(orderByField) {
      var query = pgp.as.format(`SELECT * FROM $1 WHERE "${FieldName}" IS NULL ORDER BY "${orderByField}" ${desc ? 'DESC' : 'ASC'}`, table);
    } else {
      var query = pgp.as.format(`SELECT * FROM $1 WHERE "${FieldName}" IS NULL`, table);
    }
  } else {
    if(orderByField) {
      var query = pgp.as.format(`SELECT * FROM $1  ORDER BY "${orderByField}" ${desc ? 'DESC' : 'ASC'}`, table);
    } else {
      var query = pgp.as.format("SELECT * FROM $1", table);
    }
  }
  // console.log(query);
  try {
    const res = await db.any(query);
    return res;
  } catch (error) {
    console.log("Error getting: ", error);
  }
};

exports.selectAllByMultipleConditions = async (TableName, Fields, Values) => {
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  let number = Fields.length;
  let where = "";
  for(let i = 0; i < Fields.length; i++) {
    where += `"${Fields[i]}" = ${Values[i]}`;
    if(i < Fields.length -1) {
      where += " AND ";
    }
  }
  var query = pgp.as.format('SELECT * FROM $1 WHERE $2:raw', [table, where]);
  // console.log(query);
  try {
    const res = await db.any(query);
    return res;
  } catch (error) {
    console.log("Error getting: ", error);
  }
};

exports.selectOne = async (TableName, FieldName, Value) => {
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  const query = pgp.as.format(`SELECT * FROM $1 where "${FieldName}" = '${Value}'`, table);
  try {
    const res = await db.any(query);
    return res[0];
  } catch (error) {
    console.log("Error getting: ", error);
  }
};

exports.save = async (TableName, Object) => {
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  const query = pgp.helpers.insert(Object, null, table) + " RETURNING *";
  // console.log(query);
  try {
    const res = await db.one(query);
    return res;
  } catch (error) {
    console.log("Error creating: ", error);
  }
};

exports.updateAll = async (TableName, FieldId, id, NewObject) => {
  tmpEntity = JSON.parse(JSON.stringify(NewObject));
  if (tmpEntity.ID != null) delete tmpEntity.ID;
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  const condition = pgp.as.format(` WHERE "${FieldId}" = '${id}'`, tmpEntity);
  const queryStr = pgp.helpers.update(tmpEntity, null, table) + condition;
  // console.log(queryStr);
  try {
    const res = db.none(queryStr);
    console.log(res);
    return res
  } catch (error) {
    console.log("Error updating: ", error);
  }
};

exports.update = async (TableName, FieldId, id, updatedField, newValue) => {
  let simpleStudent = {};
  simpleStudent[FieldId] = id;
  simpleStudent[updatedField] = newValue;
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  const condition = pgp.as.format(` WHERE "${FieldId}" = '${id}'`, simpleStudent);
  const queryStr = pgp.helpers.update(simpleStudent, [`${updatedField}`], table) + condition;
  // console.log(queryStr);

  try {
    db.none(queryStr);
  } catch (error) {
    console.log("Error updating: ", error);
  }
};

exports.delete = async (TableName, FieldName, Value) => {
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  const queryStr = pgp.as.format(`DELETE FROM $1 where "${FieldName}" = ${Value}`, table);
  // console.log(queryStr);
  try {
    const res = await db.result(queryStr);
    return res;
  } catch (error) {
    console.log("Error getting: ", error);
  }
};