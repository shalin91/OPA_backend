const express = require("express");
const { addEmployeeRole, getAllEmployeeRoles, getSpecificEmployeeRole, editEmployeeRole, deleteEmployeeRole, getEmployeeRolesByGroupAndType } = require("../controllers/EmployeeRoleController");


const router = express.Router();


// Routes
router.post("/adddemployeerole" , addEmployeeRole);
router.get("/getemployeeroles" , getAllEmployeeRoles);
router.get("/getemployeerolebyid/:id",getSpecificEmployeeRole);
router.post("/editemployeerole/:id",editEmployeeRole);
router.post("/deleteemployerole/:id",deleteEmployeeRole);
router.get("/getemployeerolebygroupandtype/:departmentGroupId/:departmentTypeId",getEmployeeRolesByGroupAndType);


module.exports = router;