import { Router } from "express";
import { getAllPosts,getPost,createPost,updatePost,deletePost } from "../controllers/Posts.js";

const router=Router();

/**
 * @swagger
 * tags:
 *   name: User Posts
 *   description: User posts management
 */

/**
 * @swagger
 * /profile/posts/:
 *  get:
 *    tags: [User Posts]
 *    summary: Use to get all posts
 *    description: Use to get all posts
 *    responses:
 *      '200':
 *        description: A successful response
 *  post:
 *    tags: [User Posts]
 *    summary: Use to create a post
 *    description: Use to create a post
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
router.route('/posts/').get(getAllPosts).post(createPost);

/**
 * @swagger
 * /profile/posts/{id}:
 *  get:
 *    tags: [User Posts]
 *    summary: Use to get a post by id
 *    description: Use to get a post by id
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
 *  patch:
 *    tags: [User Posts]
 *    summary: Use to update a post by id
 *    description: Use to update a post by id
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
 *      '200':
 *        description: A successful response
 *  delete:
 *    tags: [User Posts]
 *    summary: Use to delete a post by id
 *    description: Use to delete a post by id
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
router.route('/posts/:id').patch(updatePost).delete(deletePost).get(getPost);

export default router;
