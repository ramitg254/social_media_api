import pool from "../database.js";
import fs from "fs";

const checkAndCreateSchema = async () => {
  const [tables] = await pool.query('SHOW TABLES LIKE "Users"');
  if (tables.length === 0) {
    const schemaSql = fs.readFileSync("./schema.sql").toString();
    const sqlCommands = schemaSql.split(";");
    for (let sqlCommand of sqlCommands) {
      if (sqlCommand.trim() !== "") {
        await pool.query(sqlCommand);
      }
    }
  }
};
export default checkAndCreateSchema;
