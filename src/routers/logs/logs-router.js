const router = require("express").Router();
const { getRoomLogs } = require('../../handler/roomHandler')()

router.get("/logs/:room", (req, res) => {
  const { room } = req.params;
  const logs = getRoomLogs(room)
  return res.status(200).json({ logs });
});

module.exports = router