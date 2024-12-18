const Todo = require('../models/Todo');

// require() → A Node.js function that imports a file or module.


// used to create the TO-DO-List for the user.

exports.createTodo = async (req, res) => {
    // async Allows the function to handle asynchronous operations
    const { title, description, state } = req.body;
    // req.body Represents the data sent in the HTTP request (like JSON input).

    try {
        const todo = new Todo({
            title,
            description,
            state,
            userId: req.user.id,
            // Adds the user ID (from req.user) to associate the to-do with a specific user.

        });
        await todo.save();
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// This is used to fetches a list of to-do items.


exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });

        // representing the filter criteria for the database query:
        //userId: The field in the database to match.and req.user.id: The value which is coming from request object

        res.json(todos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// This is function used to fetches a particular to-do item based on id

exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        // Todo.findById() → Looks for a to-do item in the database by its unique ID.

        // req.params contains route parameters that are part of the URL path.

        // When the client sends a request to /todos/12345, 12345 will be available as req.params.id inside the function.

        if (!todo || todo.userId.toString() !== req.user.id) {
            return res.status(404).json({ error: 'To-do not found' });

            // here we are checking the userid of the todo object {converted in to string } equals to user id which is in the incoming request object
        }
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// This is function used to update a particular to-do item based on id

exports.updateTodo = async (req, res) => {
    const { title, description, state } = req.body;

    try {
        const todo = await Todo.findById(req.params.id);
        // When the client sends a request to /todos/12345, 12345 will be available as req.params.id inside the function.

        if (!todo || todo.userId.toString() !== req.user.id) {
            // here we are checking the userid of the todo object {converted in to string } equals to user id which is in the incoming request object
            return res.status(404).json({ error: 'To-do not found' });
        }

        if (title) todo.title = title;
        // here if the title is present in the req.body, then if we want to change it then we change here and assign the value to the todo.title
        if (description) todo.description = description;
        if (state) todo.state = state;

        await todo.save();
        res.json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// This is function used to delete a particular to-do item based on id

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        // When the client sends a request to /todos/12345, 12345 will be available as req.params.id inside the function.


        if (!todo || todo.userId.toString() !== req.user.id) {
            return res.status(404).json({ error: 'To-do not found' });
        }

        await todo.deleteOne();
        res.json({ message: 'To-do deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
