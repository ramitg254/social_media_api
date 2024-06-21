import { Router } from "express";
import { getAllCommentsByUser,getComment,updateComment,deleteComment } from "../controllers/Comments.js";

const router=Router();

/**
 * @swagger
 * tags:
 *   name: User Comments
 *   description: User comments management
 */

/**
 * @swagger
 * /profile/comments:
 *  get:
 *    tags: [User Comments]
 *    summary: Use to get all comments by user
 *    description: Use to get all comments by user
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/comments').get(getAllCommentsByUser)

/**
 * @swagger
 * /profile/comments/{id}:
 *  get:
 *    tags: [User Comments]
 *    summary: Use to get a comment by id
 *    description: Use to get a comment by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The comment id
 *    responses:
 *      '200':
 *        description: A successful response
 *  patch:
 *    tags: [User Comments]
 *    summary: Use to update a comment by id
 *    description: Use to update a comment by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The comment id
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
 *      '200':
 *        description: A successful response
 *  delete:
 *    tags: [User Comments]
 *    summary: Use to delete a comment by id
 *    description: Use to delete a comment by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The comment id
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/comments/:id').patch(updateComment).delete(deleteComment).get(getComment);

export default router;
