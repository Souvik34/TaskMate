import mongoose from 'mongoose';


const todoSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true,
    },

    description: 
    {
        type: String,
        required: true
    },
    status: 
    {
        type: String,
        default: false,
        enum: ['completed', 'pending'],
        required: true,
    },

}, {timestamps: true});

export const Todo = mongoose.model('Todo', todoSchema);

