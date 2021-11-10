const router = require("express").Router();
const roomRouter = require("./rooms/rooms-router");

router.use("/room", roomRouter);

module.exports = router;
