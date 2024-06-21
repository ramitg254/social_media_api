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

export const likePost = async (req, res) => {
  const user_id = req.user.id;
  const post_id = req.params.id;
  if (!(await Validid(post_id, "Posts"))) {
    throw new NotFoundError("Post Not Found");
  }

  const likeid=gen();
  const [result] = await pool.query(
    "INSERT INTO Likes (user_id,post_id,id) VALUES (?,?,?)",
    [user_id, post_id,likeid]
  );
  const [likeInfo] = await pool.query("SELECT * FROM Likes WHERE id=?", [
    likeid
  ]);
  res
    .status(200)
    .json({ message: "Post liked successfully", data: likeInfo[0] });
};

export const unlikePost = async (req, res) => {
  const user_id = req.user.id;
  const post_id = req.params.id;

  if (!(await Validid(post_id, "Posts"))) {
    throw new NotFoundError("Post Not Found");
  }
  
  const [result] = await pool.query(
    "DELETE FROM Likes WHERE user_id=? AND post_id=?",
    [user_id, post_id]
  );
  if (result.affectedRows == 0) {
    throw new BadRequestError("Post Should be liked first");
  }
  res.status(200).json({ message: "unliked successfully" });
};
