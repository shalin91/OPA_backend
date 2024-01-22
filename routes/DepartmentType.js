const express = require("express");
const { addDepartmentType, getAllDepartmentType, getSpecificDepartmentType, editDepartmentType, deleteDepartmentType, getDepartmentTypesByGroupId } = require("../controllers/DepartmentType");

const router = express.Router();


// Routes
router.post("/adddepartmenttype" , addDepartmentType);
router.get("/getdepartmentstypes" , getAllDepartmentType);
router.get("/getdepartmenttypebyid/:id",getSpecificDepartmentType);
router.post("/editdepartmenttype/:id",editDepartmentType);
router.post("/deletedepartmenttype/:id",deleteDepartmentType);
router.get("/departmenttypebygroup/:id",getDepartmentTypesByGroupId);


module.exports = router;
