const express = require("express");
const AddTask=require('../models/AddTaskModel');
const addingtask = async (req, res) => {
    try {
      const { departmentType ,taskName,taskType,accessLocation,detail,isActive } = req.body;
      const newAddTask = new AddTask({ departmentType , taskName,taskType,accessLocation,detail,isActive });
      const savedDepartmentType = await newAddTask.save();
      return res.json({success : true , data : savedDepartmentType});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getalltask = async (req, res) => {
    try {
      const task = await AddTask.find()
      .populate('departmentType','name')
      .exec();
       return res.json({data:task});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deletetask=async(req,res) =>{
    try {
      const  id  = req.params.id;
      const deletedtask = await AddTask.findByIdAndDelete(id);
  
      if (!deletedtask) {
        return res.status(404).json({ error: 'group not found' });
      }
  
       return res.json({success : true , msg:"Add Task Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  const getspecificaddtask = async (req, res) => {
    try {
      const  id  = req.params.id;
      const addtask = await AddTask.findById(id).populate('departmentType','name');
  
      if (!addtask) {
        return res.status(404).json({ error: 'group not found' });
      }
  
     return res.json({success : true , data:addtask});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const editAddTask = async (req, res) => {
    try {
      const  id  = req.params.id;
      const { departmentType,taskName,taskType,accessLocation,detail,isActive } = req.body;
  
      const updatedDepartmentType = await AddTask.findByIdAndUpdate(
        id,
        {departmentType, taskName, taskType,accessLocation,detail,isActive },
        { new: true }
      );
  
      if (!updatedDepartmentType) {
        return res.status(404).json({ error: 'Type not found' });
      }
  
       return res.json({success:true, data : updatedDepartmentType});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  module.exports = {
    addingtask,
    getalltask,
    deletetask,
    getspecificaddtask,
    editAddTask
  };