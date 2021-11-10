const router = require("express").Router();
const { getAllRooms, deleteRoom } = require("../../handler/indexHandler")
const { getRoomInfo } = require("../../handler/roomHandler")()

router.delete("/room/:name", (req, res, next) => {
  const { name } = req.params;
  deleteRoom(name)
  return res.status(200).json(true);
});

router.get("/rooms", (req, res, next) => {
  const rooms = getAllRooms();
  return res.status(200).json({ rooms });
});

router.get("/rooms/:name", (req, res, next) => {
  const { name } = req.params;
  const roomInfo = getRoomInfo(name);
  return res.status(200).json({ roomInfo });
})

module.exports = router