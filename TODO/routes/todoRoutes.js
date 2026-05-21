// first export the router
const express = require('express');
const todoRouter = express.Router();



// then import the controller functions
const { getAllTodos, createTodo, getTodoById, updateTodoByID, deleteTodoByID , deleteAllTodos } = require('../controller/todo');

// then define the routes and link them to the controller functions
todoRouter.get('/todos', getAllTodos);  
todoRouter.post('/todos', createTodo);
todoRouter.get('/todos/:id', getTodoById);
todoRouter.put('/todos/:id', updateTodoByID);
todoRouter.delete('/todos/:id', deleteTodoByID);
todoRouter.delete('/todos', deleteAllTodos);


module.exports = todoRouter;