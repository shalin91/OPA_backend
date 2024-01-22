const express = require("express");
const { addDepartmentGroup, getAllDepartmentGroup, getSpecificDepartmentGroup, editDepartmentGroup, deleteDepartmentGroup,addDefaultObjectIdToArray } = require("../controllers/DepartmentGroupMaster");

const router = express.Router();


// Routes
router.post("/adddepartmentgroup" , addDepartmentGroup);
router.get("/getdepartments" , getAllDepartmentGroup);
router.post("/getdepartmentbyid/:id",getSpecificDepartmentGroup);
router.post("/editdepartmentgroup/:id",editDepartmentGroup);
router.post("/deletedepartmentgroup/:id",deleteDepartmentGroup);
router.get("/getdefaultobjectid",addDefaultObjectIdToArray)


module.exports = router;