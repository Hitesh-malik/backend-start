const Todo = require('../models/todo');
const User = require("../models/User");

// CREATE TODO
exports.createTodo = async (req, res) => {
    try {

        const { status, task } = req.body;

        // Create todo
        const response = await Todo.create({
            status,
            task,
        });

        // Get user id from token
        const userId = req.user.userId;

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $push: { todos: response._id },
            },
            {
                returnDocument: 'after',
            }
        );

        // console.log("Updated user:", updatedUser);

        res.status(201).json({
            success: true,
            data: response,
            message: "Task created successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to create task",
        });
    }
};


// GET ALL TODOS with authentication
// exports.getAllTodos = async (req, res) => {
//     try {
//         const { user } = req.user;
//         const todos = await Todo.find({});

//         res.status(200).json({
//             success: true,
//             count: todos.length,
//             data: todos,
//             message: "All tasks fetched successfully",
//         });

//     } catch (error) {

//         console.log(error);

//         res.status(500).json({
//             success: false,
//             error: error.message,
//             message: "Failed to fetch tasks",
//         });
//     }
// };
exports.getAllTodos = async (req, res) => {
    try {
        const { userId } = req.user;
        const userdata = await User.findById(userId).populate("todos");
        // const todos = await Todo.find({});
        console.log(userdata);
        res.status(200).json({
            success: true,
            count: userdata.todos.length,
            data: userdata.todos,
            message: "All tasks fetched successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to fetch tasks",
        });
    }
};

// DELETE TODO
exports.deleteTodoByID = async (req, res) => {
    try {

        const { id } = req.params;

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            data: deletedTodo,
            message: "Todo deleted successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to delete task",
        });
    }
};


// UPDATE TODO
exports.updateTodoByID = async (req, res) => {
    try {

        const { id } = req.params;

        const { task, status } = req.body;

        const updateData = {
            task,
            status,
        };

        const response = await Todo.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        res.status(200).json({
            success: true,
            data: response,
            message: "Todo updated successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to update task",
        });
    }
};

exports.getTodoById = async (req, res) => {

    try {

        // fetch id
        const { id } = req.params;

        // find todo by id
        const data = await Todo.findById(id);

        // if todo not found
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        // success response
        res.status(200).json({
            success: true,
            data: data,
            message: "Todo fetched successfully",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch data",
            error: error.message,
        });
    }
};

exports.deleteAllTodos = async (req, res) => {
    try {
        const result = await Todo.deleteMany({});

        res.status(200).json({
            success: true,
            data: result,
            message: "All todos deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete all todos",
            error: error.message,
        });
    }
}