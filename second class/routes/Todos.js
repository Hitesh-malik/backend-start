// will mesntion the router and map them with there corresponding controller functions

const express = require("express");

// to create a router object to define the routes for our application
const router = express.Router(); 

//extract the createTodo function from the controller
const {createTodo} = require('../controller/createTodo');
const {getTodo, getTodById} = require('../controller/getTodo');
const {updateTodo} = require('../controller/updateTodo');
const {deleteTodo} = require('../controller/deleteTodo');


// now to map the route with the controller function
router.post('/create-todo', createTodo);
router.get('/getTodos', getTodo);
router.get('/getTodo/:id', getTodById);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);

module.exports = router;