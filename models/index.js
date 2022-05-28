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
exports.selectAll = async (TableName, FileName, Value) => {
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  if(FileName && Value) {
    var query = pgp.as.format(`SELECT * from $1 where "${FileName}" = '${Value}'`, table);
  } else {
    var query = pgp.as.format("SELECT * from $1", table);
  }
  console.log(query);
  try {
    const res = await db.any(query);
    return res;
  } catch (error) {
    console.log("Error getting: ", error);
  }
};

exports.selectOne = async (TableName, FileName, Value) => {
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  const query = pgp.as.format(`SELECT * from $1 where "${FileName}" = '${Value}'`, table);
  console.log(query);
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
  try {
    const res = await db.one(query);
    return res;
  } catch (error) {
    console.log("Error creating: ", error);
  }
};

exports.update = async (TableName, FieldId, id, NewObject) => {
  tmpEntity = JSON.parse(JSON.stringify(NewObject));
  if (tmpEntity.f_ID != null) delete tmpEntity.f_ID;
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  const condition = pgp.as.format(` WHERE "${FieldId}" = '${id}'`, tmpEntity);
  const queryStr = pgp.helpers.update(tmpEntity, null, table) + condition;
  try {
    db.none(queryStr);
  } catch (error) {
    console.log("Error updating: ", error);
  }
};

exports.delete = async (TableName, FieldName, Value) => {
  const table = new pgp.helpers.TableName({ table: TableName, schema: schema });
  const queryStr = pgp.as.format(`DELETE from $1 where "${FieldName}" = '${Value}'`, table);
  try {
    const res = await db.result(queryStr);
    return res;
  } catch (error) {
    console.log("Error getting: ", error);
  }
};