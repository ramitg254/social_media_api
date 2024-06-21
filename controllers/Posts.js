import pool from "../database.js";
import gen from "../utils/idgen.js";

import Errors from '../errors/index.js';
const { BadRequestError, NotFoundError } = Errors;

export const createPost = async (req, res) => {
  const userid = req.user.id;
  const { content } = req.body;

  let check = /\S/.test(content);
  if (!check) {
    throw new BadRequestError(
      "Content should contain atleast one non-whitespace character"
    );
  }

  const pid=gen();
  const result = await pool.query(
    "INSERT INTO Posts (content,user_id,id) VALUES(?,?,?)",
    [content, userid,pid]
  );

  const ans = await pool.query("Select * from Posts where id=?", [pid]);
  res
    .status(201)
    .json({ message: "Post created successfully", data: ans[0][0] });
};

export const getAllPosts = async (req, res) => {
  const userid = req.user.id;

  const [rows] = await pool.query("Select * from Posts where user_id=?", [
    userid,
  ]);
  res.status(200).json({ data: rows });
};

export const getPost = async (req, res) => {
  const pid = req.params.id;
  const result = await pool.query("SELECT * FROM Posts WHERE id=?", [pid]);
  if (result[0].length == 0) {
    throw new NotFoundError("Post Not Found");
  }
  res.status(200).json({ data: result[0][0] });
};

export const updatePost = async (req, res) => {
  const pid = req.params.id;
  const { content } = req.body;
  const user_id=req.user.id;

  let check = /\S/.test(content);
  if (!check) {
    throw new BadRequestError(
      "Content should contain atleast one non-whitespace character"
    );
  }

  const result = await pool.query("UPDATE Posts SET content=? WHERE id=? AND user_id=?", [
    content,
    pid,
    user_id
  ]);
  if (result[0].affectedRows == 0) {
    throw new NotFoundError("Post Not Found");
  }
  const [updatedPost] = await pool.query("Select * from Posts where id=?", [
    pid,
  ]);
  res
    .status(200)
    .json({ message: "Post updated successfully", data: updatedPost[0] });
};

export const deletePost = async (req, res) => {
  const pid = req.params.id;
  const user_id=req.user.id;

  const result = await pool.query("DELETE FROM Posts WHERE id=? AND user_id=?", [pid,user_id]);
  if (result[0].affectedRows == 0) {
    throw new NotFoundError("Post Not Found");
  }
  res.status(200).json({ message: "Post deleted successfully" });
};
