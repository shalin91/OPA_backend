const mongoose = require("mongoose");
const { Schema } = mongoose;
const addTask = new mongoose.Schema(

    {
        departmentType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DepartmentType",
        },
        taskName:{
            type: String,
            required: true,
        },
        taskType:{
            type: String,
            required: true,
            enum:['Form','Data'],
        },
        accessLocation:{
            type:String,
            required:true,
        },
        detail:{
            type:String,
            required:true,
        },
        isActive : {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
     }
    );

    const AddTask = mongoose.model ("AddTask" , addTask);

    module.exports = AddTask;    