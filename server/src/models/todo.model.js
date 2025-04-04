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
        default: 'Pending',
        enum: ['Completed', 'Pending'],
        required: true,
    },
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {timestamps: true});

export const Todo = mongoose.model('Todo', todoSchema);

