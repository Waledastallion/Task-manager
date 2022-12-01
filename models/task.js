const mongoose = require ("mongoose");
// const Schema = mongoose.Schema;

const Schema = require("mongoose").Schema;

const taskSchema = new Schema (

 {
    title: {
        type: String,
        required: true,
        unique: true,
        minilength: 3,
    },

    description: {
        type: String,
        required: true,
    },
    
    completed:{
        type: Boolean,
        default: false,
    },
 },
 { timestamps: true}
);

module.exports = mongoose.model('Task', taskSchema)