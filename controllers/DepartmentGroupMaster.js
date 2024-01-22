const express = require("express");
const DepartmentGroup = require("../models/DepartmentGroupMaster");
const deptgrp=[];
const addDefaultObjectIdToArray = async (req, res) => {
  try {
    const parentId = req.params.id;

    // Create a new child document with a default ObjectId
    const newChild = await DepartmentGroup.create({});

    // Find the parent document by _id and update the array
    const updatedParent = await DepartmentGroup.findByIdAndUpdate(
      parentId,
      { $push: { children: newChild._id } },
      { new: true }
    );

    if (!updatedParent) {
      return res.status(404).json({ error: 'Parent not found' });
    }

    res.json(updatedParent);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};




// Add Location
const addDepartmentGroup = async (req, res) => {
    try {
      const { name, isActive } = req.body;
      console.log(req.body);
      const newDepartmentGroup = new DepartmentGroup({ name, isActive });
      const savedDepartmentGroup = await newDepartmentGroup.save();
      return res.json({success : true , data : savedDepartmentGroup});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Edit Location
  const editDepartmentGroup = async (req, res) => {
    try {
      const  id  = req.params.id;
      const { name, isActive } = req.body;
  
      const updatedDepartmentGroup = await DepartmentGroup.findByIdAndUpdate(
        id,
        { name, isActive },
        { new: true }
      );
  
      if (!updatedDepartmentGroup) {
        return res.status(404).json({ error: 'group not found' });
      }
  
       return res.json({success:true, data : updatedDepartmentGroup});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete Location
  const deleteDepartmentGroup = async (req, res) => {
    try {
      const  id  = req.params.id;
      const deletedDepartmentGroup = await DepartmentGroup.findByIdAndDelete(id);
  
      if (!deletedDepartmentGroup) {
        return res.status(404).json({ error: 'group not found' });  
      }
  
       return res.json({success : true , msg:"Department Group Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get All Locations
  const getAllDepartmentGroup = async (req, res) => {
    try {
      const departmentGroup = await DepartmentGroup.find().exec();
       return res.json({data:departmentGroup});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
  
  // Get Specific Location
  const getSpecificDepartmentGroup = async (req, res) => {
    try {
      const  id  = req.params.id;
      const departmentGroup = await DepartmentGroup.findById(id);
  
      if (!departmentGroup) {
        return res.status(404).json({ error: 'group not found' });
      }
  
     return res.json({success : true , data:departmentGroup});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    addDepartmentGroup,
    editDepartmentGroup,
    deleteDepartmentGroup,
    getAllDepartmentGroup,
    getSpecificDepartmentGroup,
    addDefaultObjectIdToArray
  };