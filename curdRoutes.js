const express = require('express');

const { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } = require('../controllers/CrudOper');

// controllers/todoController.js. This file contains the logic for handling CRUD (Create, Read, Update, Delete) operations related to to-do items.


const authenticateToken = require('../middleware/authmiddle');

// This middleware is responsible for verifying if the user is authenticated by checking the provided token.

const router = express.Router();

// The name of the variable that will hold the Express router object.

// A router is used to handle different HTTP requests for specific routes (URLs) in the application.

router.post('/', authenticateToken, createTodo);

// router.post() this defines a POST request handler on the specified route (/).

// authenticateToken this is the middleware function it will run first, checking if the request has a valid authentication token or not. If it’s not valid, it will block access to the route.

// createTodo this is the function that handles the logic for creating a new to-do item. It will run only if the authentication token is valid.


router.get('/', authenticateToken, getTodos);

// router.get() this defines a GET request handler for the route (/).

// getTodos this is the function that handles the logic for fetching all the to-do items for the authenticated user.


router.get('/:id', authenticateToken, getTodoById);

// router.get() this defines a GET request handler for the route (/:id).

// getTodoById this is the function that handles fetching a specific to-do item by its id.


router.put('/:id', authenticateToken, updateTodo);

//router.put() this defines a PuT request handler for the route (/:id).

// updateTodo this is the function that handles the logic for updating a specific to-do item  by its id.


router.delete('/:id', authenticateToken, deleteTodo);

//router.delete() this defines a Delete request handler for the route (/:id).

// deleteTodo this is the function that handles the logic for deleting a specific to-do item  by its id.

module.exports = router;
