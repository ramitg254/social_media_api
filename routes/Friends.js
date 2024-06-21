import { Router } from "express";
import { getFriendRequests,getFriends,sendFriendRequest,acceptFriendRequest,rejectFriendRequest,removeFriend } from "../controllers/Friends.js";

const router=Router();
/**
 * @swagger
 * tags:
 *   name: Friends
 *   description: User Friends management
 */

/**
 * @swagger
 * /profile/friends:
 *  get:
 *    tags: [Friends]
 *    summary: Use to get all friends
 *    description: Use to get all friends
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/friends').get(getFriends);

/**
 * @swagger
 * /profile/friends/{id}:
 *  post:
 *    tags: [Friends]
 *    summary: Use to send a friend request
 *    description: Use to send a friend request
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The friend id
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/friends/:id').post(sendFriendRequest)

/**
 * @swagger
 * /profile/friends/requests:
 *  get:
 *    tags: [Friends]
 *    summary: Use to get all friend requests
 *    description: Use to get all friend requests
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/friends/requests').get(getFriendRequests);

/**
 * @swagger
 * /profile/friends/{id}/accept:
 *  patch:
 *    tags: [Friends]
 *    summary: Use to accept a friend request
 *    description: Use to accept a friend request
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The friend id
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/friends/:id/accept').patch(acceptFriendRequest);

/**
 * @swagger
 * /profile/friends/{id}/reject:
 *  delete:
 *    tags: [Friends]
 *    summary: Use to reject a friend request
 *    description: Use to reject a friend request
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The friend id
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/friends/:id/reject').delete(rejectFriendRequest);

/**
 * @swagger
 * /profile/friends/{id}/remove:
 *  delete:
 *    tags: [Friends]
 *    summary: Use to remove a friend
 *    description: Use to remove a friend
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *        description: The friend id
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/friends/:id/remove').delete(removeFriend);


export default router;
