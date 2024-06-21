import { Router } from "express";
import { likePost, unlikePost } from "../controllers/Likes.js";
import { getAllCommentsOnPost,createComment } from "../controllers/Comments.js";

const router = Router({mergeParams: true});
/**
 * @swagger
 * tags:
 *   name: Posts Data
 *   description: Posts Data management
 */

/**
 * @swagger
 * /post/{id}/like:
 *  post:
 *    tags: [Posts Data]
 *    summary: Use to like a post
 *    description: Use to like a post
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The post id
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/like').post(likePost);

/**
 * @swagger
 * /post/{id}/unlike:
 *  delete:
 *    tags: [Posts Data]
 *    summary: Use to unlike a post
 *    description: Use to unlike a post
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The post id
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/unlike').delete(unlikePost);

/**
 * @swagger
 * /post/{id}/comments:
 *  get:
 *    tags: [Posts Data]
 *    summary: Use to get all comments on a post
 *    description: Use to get all comments on a post
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The post id
 *    responses:
 *      '200':
 *        description: A successful response
 *  post:
 *    tags: [Posts Data]
 *    summary: Use to create a comment on a post
 *    description: Use to create a comment on a post
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *    responses:
 *      '201':
 *        description: A successful response
 */
router.route('/comments').get(getAllCommentsOnPost).post(createComment);


export default router;
