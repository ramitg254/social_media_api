import pool from "../database.js";

export const findUser = async (profile) => {
    const res=await pool.query('Select * from Users where email=?',[profile.emails[0].value]);
    return res[0][0];
};
