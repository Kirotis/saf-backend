const router = require("express").Router();

router.delete("/room/:name", (req, res, next) => {
  const { name } = req.params;
  io.sockets.clients(name).forEach((s) => s.leave(name));
  return res.status(200);
});

router.get("/rooms", (req, res, next) => {
 
  return res.status(200).json({ rooms });
});

module.exports = router