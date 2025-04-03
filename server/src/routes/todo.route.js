import {Router} from 'express';
import { createTodo, deleteTodo, getTodos, showTodo,  updateTodo } from '../controllers/todo.controller.js';
import {verifyToken}  from "../utils/verifyToken.js"
const router = Router();

router.route('/create').post(verifyToken, createTodo);
router.route('/get').get(verifyToken, getTodos);
router.route('/show/:todoId').get(verifyToken, showTodo);
router.route('/update/:todoId').put(verifyToken, updateTodo);
router.route('/delete/:todoId').delete(verifyToken, deleteTodo);


export default router;