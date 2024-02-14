const express = require('express');
const router = express.Router();
const Controller = require('../controller/TodoController')

router.get('/',Controller.getFetchTodosCall);
router.post('/',Controller.postAddTodoCall);
router.put('/',Controller.putUpdateTodo);
router.delete('/',Controller.deleteTodo)

module.exports = router;