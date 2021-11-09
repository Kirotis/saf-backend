const router = require("express").Router();
const logRouter = require("./logs/logs-router");
const roomRouter = require("./rooms/rooms-router");

router.use("/room", roomRouter);
router.use("/log", logRouter);

module.exports = router;
