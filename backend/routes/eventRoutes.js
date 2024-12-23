const express = require('express');
const router = express.Router();
const {createEvent,registerEvent,updateEvent,deleteEvent,getEvent,getAllEvents}=require("../controllers/eventController");
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/create',protect,admin,createEvent);
router.post('/register/:eventId',protect,registerEvent);
router.put('/update/:eventId',protect,admin,updateEvent);
router.delete('/:eventId',protect,admin,deleteEvent);
router.get('/:eventId',protect,getEvent);
router.get('/',protect,getAllEvents);

module.exports=router;