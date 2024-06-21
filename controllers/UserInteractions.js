import errors from "../errors/index.js";
const { CustomAPIError } = errors;
import pool from "../database.js";

export const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      throw new CustomAPIError("Something went wrong");
    }
    res.status(200).json({ message: "Logged out" });
  });
};

export const getFeed = async (req, res) => {
  const userId = req.user.id;
  const [friendsPosts] = await pool.query(
    `SELECT * FROM posts 
    WHERE user_id IN (
        SELECT user_id FROM (
            (SELECT user_id2 as user_id FROM Friends WHERE user_id1 = ? AND friendship_status="ACCEPTED") 
            UNION 
            (SELECT user_id1 as user_id FROM Friends WHERE user_id2 = ? AND friendship_status="ACCEPTED")
            UNION 
            SELECT 0 -- dummy value
        ) as user_ids
    ) ORDER BY created_at DESC
    LIMIT 100`,
    [userId, userId]
  );

  if (friendsPosts.length == 100) {
    res.status(200).json(friendsPosts);
  } else {
    const [randomPosts] = await pool.query(
      `SELECT * FROM posts 
    WHERE user_id NOT IN (
        SELECT user_id FROM (
            (SELECT user_id2 as user_id FROM Friends WHERE user_id1 = ? AND friendship_status="ACCEPTED") 
            UNION 
            (SELECT user_id1 as user_id FROM Friends WHERE user_id2 = ? AND friendship_status="ACCEPTED")
            UNION 
            SELECT 0 -- dummy value
        ) as user_ids
    ) AND user_id != ? ORDER BY created_at DESC
    LIMIT ?`,
      [userId, userId, userId, 100 - friendsPosts.length]
    );
    friendsPosts.push(...randomPosts);
    res.status(200).json(friendsPosts);
  }
};

export const getFriendRecommendations = async (req, res) => {
  const userId = req.user.id;

  const [recommendations] = await pool.query(
    "SELECT id,username FROM Users WHERE id NOT IN ((SELECT user_id2 FROM Friends WHERE user_id1 = ?) UNION  (SELECT user_id1 FROM Friends WHERE user_id2 = ?)) AND id != ? LIMIT 15",
    [userId, userId, userId]
  );

  res.status(200).json(recommendations);
};
