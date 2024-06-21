import pool from "../database.js";
import gen from "../utils/idgen.js";
import Errors from "../errors/index.js";
const { BadRequestError, NotFoundError } = Errors;

const Validid = async (id, table) => {
  const [rows] = await pool.query(`Select * from ${table} where id=?`, [id]);
  if (rows.length == 0) {
    return false;
  }
  return true;
};

export const createComment = async (req, res) => {
  const { content } = req.body;
  const user_id = req.user.id;
  const post_id = req.params.id;
  let check = /\S/.test(content);
  if (!check) {
    throw new BadRequestError(
      "Content should contain atleast one non-whitespace character"
    );
  }

  if (!(await Validid(post_id, "Posts"))) {
    throw new NotFoundError("Post Not Found");
  }

  const commentId = gen();
  await pool.query(
    "INSERT INTO Comments (user_id,post_id,content,id) VALUES (?,?,?,?)",
    [user_id, post_id, content, commentId]
  );

  const [comment] = await pool.query("SELECT * FROM Comments WHERE id=?", [
    commentId,
  ]);
  res
    .status(201)
    .json({ message: "Comment created successfully", data: comment[0] });
};

export const getAllCommentsByUser = async (req, res) => {
  const user_id = req.user.id;

  const [result] = await pool.query("SELECT * FROM Comments WHERE user_id=?", [
    user_id,
  ]);
  res.status(200).json({ data: result });
};

export const getAllCommentsOnPost = async (req, res) => {
  const post_id = req.params.id;

  if (!(await Validid(post_id, "Posts"))) {
    throw new NotFoundError("Post Not Found");
  }

  const [result] = await pool.query("SELECT * FROM Comments WHERE post_id=?", [
    post_id,
  ]);
  res.status(200).json({ data: result });
};

export const getComment = async (req, res) => {
  const comment_id = req.params.id;

  if (!(await Validid(comment_id, "Comments"))) {
    throw new NotFoundError("Comment Not Found");
  }

  const [result] = await pool.query("SELECT * FROM Comments WHERE id=?", [
    comment_id,
  ]);

  res.status(200).json({ data: result[0] });
};

export const updateComment = async (req, res) => {
  const comment_id = req.params.id;
  const { content } = req.body;
  const user_id = req.user.id;

  let check = /\S/.test(content);
  if (!check) {
    throw new BadRequestError(
      "Content should contain atleast one non-whitespace character"
    );
  }

  const [result] = await pool.query(
    "UPDATE Comments SET content=? WHERE id=? AND user_id=?",
    [content, comment_id,user_id]
  );
  
  if(result.affectedRows==0){
    throw new NotFoundError("Comment Not Found");
  }

  const [updatedComment] = await pool.query(
    "SELECT * FROM Comments WHERE id=?",
    [comment_id]
  );
  res.status(200).json({
    message: "Comment updated successfully",
    data: updatedComment[0],
  });
};

export const deleteComment = async (req, res) => {
  const comment_id = req.params.id;
  const user_id = req.user.id;

  if (!(await Validid(comment_id, "Comments"))) {
    throw new NotFoundError("Comment Not Found");
  }

  const [result] = await pool.query(
    "DELETE FROM Comments WHERE id=? AND user_id=?",
    [comment_id, user_id]
  );
  if(result.affectedRows==0){
    throw new NotFoundError("Comment Not Found");
  }
  res.status(200).json({ message: "Comment deleted successfully" });
};
