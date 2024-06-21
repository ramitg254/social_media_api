import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool(
    process.env.DATABASE_URL
  )
  .promise();

export default pool;
