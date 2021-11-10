const httpServer = require("../index");
const clientUrl = process.env.CLIENT_URL || "http://localhost:4200";
const socketIo = require("socket.io");
const io = socketIo(httpServer, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"],
  },
});

const { leaveRoom, joinRoom, editHref, createRoom } = require("./roomHandler")(io);

const onConnection = (socket) => {
  console.log("socket was created " + socket.id);

  socket.on("editHref", editHref);
  socket.on("createRoom", createRoom);
  socket.on("joinRoom", joinRoom);
  socket.on("leaveRoom", leaveRoom);
};

io.on("connection", onConnection);

const getAllRooms = () => {
  const arr = Array.from(io.sockets.adapter.rooms);
  const filtered = arr.filter((room) => !room[1].has(room[0]));
  const rooms = filtered.map((i) => i[0]);
  return rooms;
};

const deleteRoom = (room) => {
  io.sockets.clients(room).forEach((s) => s.leave(room));
};

module.exports = {
  deleteRoom,
  getAllRooms
}