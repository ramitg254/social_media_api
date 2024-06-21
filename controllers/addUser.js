import pool from "../database.js";
import gen from "../utils/idgen.js";

export const addUser = async (profile) => {
    const id=gen();
    await pool.query('INSERT INTO Users (username,email,id) VALUES(?,?,?)',[profile.displayName,profile.emails[0].value,id]);
    const  ans= await pool.query('Select * from Users where id=?',[id]);
    return ans[0][0];
};
