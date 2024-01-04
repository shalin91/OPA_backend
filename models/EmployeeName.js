const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeName = new mongoose.Schema(

{
    departmentGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DepartmentGroup",
    },
    departmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DepartmentType",
    },
    employeeRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employeerole",
    },
    name : String,
    isActive : {
        type: Boolean,
        default: true,
    },
},
{
    timestamps: true,
  }
);

const EmployeeName = mongoose.model ("Employeename" , employeeName);

module.exports = EmployeeName;
