const express = require("express");
const router = express.Router();
const {addingtask,getalltask,deletetask,getspecificaddtask, editAddTask}=require("../controllers/AddTaskController")

router.post('/addnewtask',addingtask);
router.get('/getalltask',getalltask);
router.delete('/deletetask/:id',deletetask);
router.get('/getspecifictask/:id',getspecificaddtask)
router.post("/edittask/:id",editAddTask);
module.exports = router;