const express = require("express");
// const router=require(express).Router();
const { addCommunityMessages,editCommunityMessages,deleteCommunity,getallcommunitydetails,getSpecificCommunityMaster,getCommunityByGroupAndTypeAndRoleAndAccess } = require("../controllers/CommunityUpdateMaster");
// const upload = require("../middlewares/multerMiddleware");

const router = express.Router();


// Routes
router.post("/addcommunitymessages" ,addCommunityMessages);

router.get("/getcommunitymessage" , getallcommunitydetails);
// router.post("/getemployeerolebyid/:id",getSpecificEmployeeRole);
router.post("/editcommunitymessages/:id",editCommunityMessages);
// router.post("/deleteemployerole/:id",deleteEmployeeRole);
router.get("/getcommunitymessagebylocationgrouptyperoleandaccess/:departmentGroupId",getCommunityByGroupAndTypeAndRoleAndAccess);
router.get


module.exports = router;