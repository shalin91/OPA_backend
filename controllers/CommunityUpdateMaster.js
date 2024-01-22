const express = require("express");
// const DepartmentGroup = require("../models/DepartmentGroupMaster");
const communityMaster=require("../models/CommunityMaster");
// const departmentgroup=require("../models/DepartmentGroupMaster")
// const departmentType=require("../models/DepartmentType")
// const employeename=require("../models/EmployeeName")
// const employeerole=require("../models/EmployeesRole");



// departmentType.aggregate([
//   {
//     $lookup:{
//       from:"departmentgroup",
//       localField:"departmentGroup",
//       foreignField:"_id",
//       as:"matchedFields"
//     }
//   },
//   {
//     $addfields:{
//       matchedIds:{
//         $map:{
//           input:"$matchedDocs",
//           as:"matchedField",
//           in:"$$matchedField.commonId"
//         }
//       }
//     }
//   },
//   {
//     $addfields:{
//       commonIdsInBothCollections:{
//         $filter:{
//           input:"$_id",
//           as:"_id",
//           cond:{$in:["$$_id","$matchedIds"]}
//           console.log(matchedIds);
//         }
//       }
//     }
//   }
// ]);


// const getdepartmenttypecommonwithdeptgrp=async()=>{
//   try{
// const departmenttype=await departmentType.find({departmentgroup.map:req.body.departmentGroup})
// res.status(200).send({success:true,msg:'Department Type Data',data:departmenttype})
//   }
//   catch(error){
//     res.status(400).send({success:false,msg:error.message})
//   }
// }


// Add Community 
const addCommunityMessages = async (req, res) => {
    try {
      const id=req.params.id;
      // const photo=req.file.path;
      const {name,message,locationSchema,departmentGroup,departmentType,employeeRole,employeeName,isActive } = req.body;
      console.log(req.body);
      const user=await communityMaster.create({
        name:name,
        message:message,
        locationSchema:locationSchema,
        departmentGroup:departmentGroup,
        departmentType:departmentType,
        employeeRole:employeeRole,
        employeeName:employeeName,
        isActive:isActive,
        uploadimage: null
      })
      
      return res.json({success : true , user});
      }
      
     catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error)
    }
  };


  
  // Edit Community
  const editCommunityMessages = async (req, res) => {
    try {
      const  id  = req.params.id;
      const {name,uploadimage,message,locationSchema,departmentGroup,departmentType,employeeRole,roleSchema,isActive } = req.body;
  
      const updatedcommunitygroup = await CommunityMaster.findByIdAndUpdate(
        id,
        {name,uploadimage,message,locationSchema,departmentGroup,departmentType,employeeRole,roleSchema,isActive },
        { new: true },
      );
  
      if (!updatedcommunitygroup) {
        return res.status(404).json({ error: 'community not found' });
      }
  
       return res.json({success:true, data : updatedcommunitygroup});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete community
  const deleteCommunity = async (req, res) => {
    try {
      const  id  = req.params.id;
      const deletedcommunitygroup = await communityMaster.findByIdAndDelete(id);
  
      if (!deletedcommunitygroup) {
        return res.status(404).json({ error: 'group not found' });
      }
  
       return res.json({success : true , msg:"Department Group Deleted Successfully"});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get All community details
  const getallcommunitydetails = async (req, res) => {
    try {
      const communitymaster = await communityMaster.find().populate([
        {path:'locationSchema',select:'name'},
        {path:'departmentGroup',select:'name'},
        {path:'departmentType',select:'name departmentGroup'},
        {path:'employeeRole',select:'EmployeeRole departmentGroup departmentType'},
        {path:'roleSchema',select:'role'},
      ]).exec();
       return res.json({data:communitymaster});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get Specific Community Details
  const getSpecificCommunityMaster = async (req, res) => {
  //     //  const  id  = req.params.id;
  //   // try {
  //   //   const  id  = req.params.id;
  //   //   const Communitygroup = await communityMaster.findById(id).populate([
  //   //     {path:'locationSchema',select:'name'},
  //   //     {path:'departmentGroup',select:'name'},
  //   //     {path:'departmentType',select:'name'},
  //   //     {path:'employeeRole',select:'EmployeeRole'},
  //   //     {path:'roleSchema',select:'role'},
        
  //   //   ]);
  
  //   //   if (!Communitygroup) {
  //   //     return res.status(404).json({ error: 'group not found' });
  //   //   }
  
  //   //  return res.json({success : true , data:Communitygroup});
    
  //     // Use $elemMatch to find a document where an item's _id matches the provided itemId
  //   //   const document = await communityMaster.findOne({
  //   //     department: { $elemMatch: { _id: id } }, // Assuming itemId is a string
  //   //   });
  
  //   //   if (!document) {
  //   //     return res.status(404).json({ error: 'Document not found' });
  //   //   }
  
  //   //   // Handle the found document as needed
  //   //   res.json(document);
    
  //   // } catch (error) {
  //   //   res.status(500).json({ error: error.message });
  //   // }
  };

  const getCommunityByGroupAndTypeAndRoleAndAccess = async (req, res) => {
    try {
      // const locationId=req.params.locationId;
      const departmentGroupId = req.params.departmentGroupId;
      const departmentTypeId = req.params.departmentTypeId;
      // const employeeRoleId = req.params.employeeRoleId;
      // const employeeAccessId = req.params.employeeAccessId;
      const items =[];
  
      const comaster = await departmentGroup.find({
        // departmentGroup: departmentGroupId
        items:{$elemMatch:{departmentGroupId:departmentType.departmentGroup}}

      })
        .populate([
          {path:'locationSchema',select:'name'},
          {path:'departmentGroup',select:'name'},
          {path:'departmentType',select:'name'},
          {path:'employeeRole',select:'EmployeeRole'},
          {path:'roleSchema',select:'role'},
        ])
        .exec();
  
      return res.json({data:comaster});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    addCommunityMessages,
    editCommunityMessages,
    deleteCommunity,
    getallcommunitydetails,
    getSpecificCommunityMaster,
    getCommunityByGroupAndTypeAndRoleAndAccess,
    // getdepartmenttypecommonwithdeptgrp
  };