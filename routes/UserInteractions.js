
import {logout,getFriendRecommendations,getFeed} from "../controllers/UserInteractions.js";
import { Router } from "express";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: User Interactions
 *   description: User Interactions management
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     tags:
 *       - User Interactions
 *     summary: Logs out the current user
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.route("/logout").get(logout);

/**
 * @swagger
 * /feed:
 *   get:
 *     tags:
 *       - User Interactions
 *     summary: Retrieves the feed for the current user
 *     responses:
 *       200:
 *         description: Feed retrieved successfully
 */
router.route("/feed").get(getFeed);

/**
 * @swagger
 * /recommendations:
 *   get:
 *     tags:
 *       - User Interactions
 *     summary: Retrieves friend recommendations for the current user
 *     responses:
 *       200:
 *         description: Recommendations retrieved successfully
 */
router.route("/recommendations").get(getFriendRecommendations);

export default router;
