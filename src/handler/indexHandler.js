// const clientUrl = process.env.CLIENT_URL || "http://localhost:4200";
const {Server} = require("socket.io");
const io = new Server({
    cors: {
        // origin: clientUrl,
        methods: ["GET", "POST"],
    },
});

const roomHandler = require("./roomHandler")(io);

const onConnection = (socket) => {
    console.log("socket was created " + socket.id);

    socket.on("editHref", roomHandler.editHref);
    socket.on("createRoom", roomHandler.createRoom);
    socket.on("joinRoom", roomHandler.joinRoom);
    socket.on("leaveRoom", roomHandler.leaveRoom);
    socket.on("addLogRoom", roomHandler.addLogRoom);
    socket.on("deleteRoom", roomHandler.deleteRoom);
    socket.on("changePauseVideo", roomHandler.changePauseVideo);
    // socket.on("changeNextVideo", roomHandler.changeNextVideo);
    // socket.on("changePreviousVideo", roomHandler.changePreviousVideo);
    // socket.on("changePlayVideoAt", roomHandler.changePlayVideoAt);
    socket.on("changeMute", roomHandler.changeMute);
    socket.on("changeSetVolume", roomHandler.changeVolume);
    // socket.on("changeGetPlayerMode", roomHandler.changeGetPlayerMode);
};

io.on("connection", onConnection);

module.exports = {
    getAllRooms: roomHandler.getAllRooms, deleteRoom: roomHandler.deleteRoom, getRoomInfo: roomHandler.getRoomInfo, io
}