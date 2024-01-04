const express = require("express");
const EmployeesNames = require("../models/EmployeeName");

// Add Type
const addEmployeeName = async (req, res) => {
    try {
      const { departmentGroup ,departmentType, employeeRole,name, isActive } = req.body;
      const newEmployeeName = new EmployeesNames({ departmentGroup ,departmentType, employeeRole,name, isActive });
      const savedEmployeeName = await newEmployeeName.save();
      return res.json({success : true , data : savedEmployeeName});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Edit Type
  const editEmployeeName = async (req, res) => {
    try {
      const  id  = req.params.id;
      const { departmentGroup ,departmentType, employeeRole,name, isActive } = req.body;
  
      const updatedEmployeeName = await EmployeesNames.findByIdAndUpdate(
        id,
        {departmentGroup ,departmentType, employeeRole,name, isActive},
        { new: true }
      );
  
      if (!updatedEmployeeName) {
        return res.status(404).json({ error: 'Type not found' });
      }
  
       return res.json({success:true, data : updatedEmployeeName});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete Type
  const deleteEmployeeName = async (req, res) => {
    try {
      const  id  = req.params.id;
      const deletedEmployeeName = await EmployeesNames.findByIdAndDelete(id);
  
      if (!deletedEmployeeName) {
        return res.status(404).json({ error: 'employee role not found' });
      }
  
       return res.json({success : true , msg:"Employee Role Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get All Types
  const getAllEmployeeNames = async (req, res) => {
    try {
      const employeeNames = await EmployeesNames.find() .populate([
        { path: 'departmentGroup', select: 'name' },
        { path: 'departmentType', select: 'name' },
        { path: 'employeeRole', select: 'EmployeeRole' },
      ]).exec();
       return res.json({data:employeeNames});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get Specific Type
  const getSpecificEmployeeName = async (req, res) => {
    try {
      const  id  = req.params.id;
      const employeeName = await EmployeesNames.findById(id);
  
      if (!employeeName) {
        return res.status(404).json({ error: 'Emp Role not found' });
      }
  
     return res.json({success : true , data:employeeName});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    addEmployeeName,
    editEmployeeName,
    deleteEmployeeName,
    getAllEmployeeNames,
    getSpecificEmployeeName,
  };