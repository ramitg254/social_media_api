import pool from "../database.js";

import Errors from "../errors/index.js";
const { NotFoundError,BadRequestError } = Errors;

const ValidUser = async (id) => {
  const [rows] = await pool.query(`Select * from Users where id=?`, [id]);
  if (rows.length == 0) {
    return false;
  }
  return true;
};
const ValidRequest = async (user_id, friend_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM Friends WHERE friendship_status="PENDING" AND user_id1=? AND user_id2=?',
    [friend_id, user_id]
  );
  if (rows.length == 0) {
    return false;
  }
  return true;
};

export const sendFriendRequest = async (req, res) => {
  const friend_id = req.params.id;
  const user_id = req.user.id;
  if (!(await ValidUser(friend_id))) {
    throw new NotFoundError("User not found");
  }
  if(friend_id===user_id){
    throw new BadRequestError("You cannot send request to yourself");
  }
  const [result] = await pool.query(
    "INSERT INTO Friends (user_id1,user_id2) VALUES (?,?)",
    [user_id, friend_id]
  );
  const [request] = await pool.query(
    "SELECT user_id2 as friend_id,friendship_status FROM Friends WHERE user_id1=? AND user_id2=?",
    [user_id, friend_id]
  );
  res.status(200).json({ message: "Friend Request Sent", data: request[0] });
};

export const getFriendRequests = async (req, res) => {
  const user_id = req.user.id;

  const [result] = await pool.query(
    'SELECT id,username FROM Users WHERE id IN (SELECT user_id1 FROM Friends WHERE user_id2=? AND friendship_status="PENDING" UNION SELECT "0" /*dummy value*/)',
    [user_id]
  );
  res.status(200).json({ message: "Friend Requests", data: result });
};

export const getFriends = async (req, res) => {
  const user_id = req.user.id;

  const [result] = await pool.query(
    `SELECT id,username FROM Users WHERE id IN (
    (SELECT user_id1 FROM Friends WHERE user_id2=? AND friendship_status="ACCEPTED") 
    UNION 
    (SELECT user_id2 FROM Friends WHERE user_id1=? AND friendship_status="ACCEPTED") 
    UNION
    SELECT "0" /*dummy value*/)`,
    [user_id, user_id]
  );
  res.status(200).json({ message: "Friends list", data: result });
};

export const acceptFriendRequest = async (req, res) => {
  const friend_id = req.params.id;
  const user_id = req.user.id;
  if (!(await ValidRequest(user_id, friend_id))) {
    throw new NotFoundError("Request not Found");
  }
  const [result] = await pool.query(
    'UPDATE Friends SET friendship_status="ACCEPTED" WHERE user_id1=? AND user_id2=?',
    [friend_id, user_id]
  );

  const [friend] = await pool.query(
    "SELECT user_id1 as friend_id,friendship_status FROM Friends WHERE user_id1=? AND user_id2=?",
    [friend_id, user_id]
  );
  res.status(200).json({ message: "Friend Request Accepted", data: friend[0] });
};

export const rejectFriendRequest = async (req, res) => {
  const friend_id = req.params.id;
  const user_id = req.user.id;
  if (!(await ValidRequest(user_id, friend_id))) {
    throw new NotFoundError("Request not Found");
  }

  const [result] = await pool.query(
    'DELETE FROM Friends WHERE user_id1=? AND user_id2=? AND friendship_status="PENDING"',
    [friend_id, user_id]
  );

  res.status(200).json({ message: "Friend Request Rejected" });
};

export const removeFriend = async (req, res) => {
  const friend_id = req.params.id;
  const user_id = req.user.id;

  const [result] = await pool.query(
    'DELETE FROM Friends WHERE (user_id1=? AND user_id2=? AND friendship_status="ACCEPTED") OR (user_id1=? AND user_id2=? AND friendship_status="ACCEPTED")',
    [friend_id, user_id, user_id, friend_id]
  );
  if (result.affectedRows == 0) {
    throw new NotFoundError("Friend not Found");
  }
  res.status(200).json({ message: "Friend Removed" });
};
