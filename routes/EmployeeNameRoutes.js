const express = require("express");
const { addEmployeeName, getAllEmployeeNames, getSpecificEmployeeName, editEmployeeName, deleteEmployeeName } = require("../controllers/EmployeeNameController");



const router = express.Router();


// Routes
router.post("/adddemployeename" , addEmployeeName);
router.post("/getemployeenames" , getAllEmployeeNames);
router.post("/getemployeenamebyid/:id",getSpecificEmployeeName);
router.post("/editemployeename/:id",editEmployeeName);
router.post("/deleteemployeename/:id",deleteEmployeeName);


module.exports = router;