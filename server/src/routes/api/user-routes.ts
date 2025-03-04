import express from 'express';
const router = express.Router();
import {
  createUser, //mutation we create but there's no delete user...definitely no delete user
  getSingleUser, //query
  saveBook, //mutation, since Book is a subdocument on user. Adding a book would be to modify User
  deleteBook, //mutation
  login, //query
} from '../../controllers/user-controller.js';

// import middleware
import { authenticateToken } from '../../utils/auth.js';

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authenticateToken, saveBook);

router.route('/login').post(login);

router.route('/me').get(authenticateToken, getSingleUser);

router.route('/books/:bookId').delete(authenticateToken, deleteBook);

export default router;
