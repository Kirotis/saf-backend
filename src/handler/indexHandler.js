// const clientUrl = process.env.CLIENT_URL || "http://localhost:4200";
const {Server} = require("socket.io");
const io = new Server({
  cors: {
    // origin: clientUrl,
    methods: ["GET", "POST"],
  },
});

const { leaveRoom, joinRoom, editHref, createRoom, addLogRoom, getAllRooms, deleteRoom, getRoomInfo } = require("./roomHandler")(io);

const onConnection = (socket) => {
  console.log("socket was created " + socket.id);

  socket.on("editHref", editHref);
  socket.on("createRoom", createRoom);
  socket.on("joinRoom", joinRoom);
  socket.on("leaveRoom", leaveRoom);
  socket.on("addLogRoom", addLogRoom);
  socket.on("deleteRoom", deleteRoom)
};

io.on("connection", onConnection);

module.exports = {
  getAllRooms, deleteRoom, getRoomInfo, io
}