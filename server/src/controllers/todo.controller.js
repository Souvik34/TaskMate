import { Todo } from "../models/todo.model.js";
import { errorHandler } from "../utils/error.js";

export const createTodo = async (req, res, next) => {

    try {
        const {title, description} = req.body;
        const {id}= req.user;

        if(!title)
        {
            return next(errorHandler(400, "Title is required!"))
        }
        if(!description)
        {
            return next(errorHandler(400, "Description is required!"))
        }   

        if (!req.user || !req.user.id) {
            return next(errorHandler(401, "Unauthorized: User not authenticated"));
        }
        
        const newTodo = new Todo({
            title, 
            description,
            userId: id
        
        });

        await newTodo.save();

        res.status(201).json({
            success: true,
            message: "Todo created sucessfully!",
            data: {
                title: newTodo.title,
                description: newTodo.description,
                timestamp: newTodo.createdAt,
                id: newTodo._id
            }

        })

    } catch (error) {
        next(error)
    }
}

export const getTodos = async (req, res, next) => {

    const {id} = req.user;
    try {
        const todos = await Todo.find({ userId: id }).sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            message: todos.length > 0? "Todos fetched successfully!" : "No todos found!",
            todos

        })
        
    } catch (error) {
        next(error)
    }
}

export const showTodo = async (req, res, next) => {
    try {
        const {todoId} = req.params;
        const todo = await Todo.findById(todoId);

        if(!todo)
        {
            return next(errorHandler(404, "Todo not found!"))
        }
        
        res.status(200).json({
            success: true,
            message: "Todo fetched successfully!",
            todo
        })
    } catch (error) {
        next(error)
        
    }
}

export const updateTodo = async (req, res, next) => {

    try {
        const {todoId} = req.params;
        const todo = await Todo.findById(todoId);
        if(!todo)
        {
            return next(errorHandler(404, "Todo not found!"))
        }

        if(req.user.id !== todo.userId.toString())
        {
            return next(errorHandler(403, "Forbidden: You are not allowed to perform this action!"))
        }
      
        const {title, description, status} = req.body;

        
    if(!title && !description && status === undefined)
        {
            return next (errorHandler(400, "No changes provided"))
        }

        if(title)
        {
            todo.title = title;
        }
        if(description)
        {
            todo.description = description;
        }
        if(status)
        {
            todo.status = status;
        }
        await todo.save();


        res.status(200).json({
            success: true,
            message: "Todo updated successfully!",
            todo
        })
        
    } catch (error) {
        next(error)
        
    }
}

export const deleteTodo = async (req, res, next) => {
    const {todoId} = req.params;
    try {
        const todo = await Todo.findOneAndDelete({_id:todoId, userId: req.user.id});

        if(!todo)
        {
            return next(errorHandler(404, "Todo not found!"))
        }


      

        res.status(200).json({
            success: true,
            message: "Todo deleted successfully!",
            
        })

        
    } catch (error) {
        next(error)
    }
}
