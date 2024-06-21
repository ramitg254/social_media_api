import pool from "../database.js";

const getAllUsers=async()=>{
    const res=await pool.query('Select * from Users');
    return res[0];
}
console.log(await getAllUsers());
