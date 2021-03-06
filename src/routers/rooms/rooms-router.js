const router = require("express").Router();
const { getAllRooms, deleteRoom, getRoomInfo } = require("../../handler/indexHandler")

router.delete("/:name", (req, res, next) => {
  const { name } = req.params;
  deleteRoom(name)
  return res.status(200).json(true);
});

router.get("/", (req, res, next) => {
  const rooms = getAllRooms();
  return res.status(200).json({ rooms });
});

router.get("/:name", (req, res, next) => {
  const { name } = req.params;
  const roomInfo = getRoomInfo(name);
  if (roomInfo) return res.status(200).json(roomInfo);
  return res.status(404).json('err')
})

module.exports = router