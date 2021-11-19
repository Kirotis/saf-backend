const roomsInfo = {};
const getRoomInfo = (room) => roomsInfo[room];

module.exports = (io) => {
    const getAllRooms = () => {
        const arr = Array.from(io.sockets.adapter.rooms);
        const filtered = arr.filter((room) => !room[1].has(room[0]));
        const rooms = filtered.map((i) => i[0]);
        return rooms;
    };

    const deleteRoom = function (room) {
        const socket = this;
        console.log(`socket.rooms`, socket.rooms)
        if (roomsInfo[room] && socket.id === roomsInfo[room].hostSocketId) {
            io.of("/").to(room).emit("roomWasDeleted", room);
            io.of("/").to(room).disconnectSockets(true);
            delete roomsInfo[room];
            console.log(`room ${room} was delete`);
        }
    };

    const addLogRoom = function (room, message, socket = this) {
        const date = new Date()
        const logData = {
            message,
            date: date.valueOf()
        }
        console.info(`(${date.toLocaleString()}) ${message}`);
        if (roomsInfo[room] && roomsInfo[room].logs) {
            roomsInfo[room].logs.push(logData);
        } else {
            roomsInfo[room] = {
                logs: [logData],
                activeUrl: "none",
                hostSocketId: socket.id,
                isMuted: false,
                isPause: true,
                volume: 25,
            };
        }
        io.in(room).emit("sendLog", logData);
    };

    const checkConnection = function(room, socket = this) {
        if (socket.rooms.indexOf(room) < 0) {
            joinRoom(room, socket)
        } else return true
    }

    const leaveRoom = function (room) {
        const socket = this;
        const message = `socket ${socket.id} has leaved room ${room}`;
        socket.leave(room);
        addLogRoom(room, message, socket);
    };

    const joinRoom = function (room, socket = this) {
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} has joined room ${room}`;
            socket.join(room);
            socket.emit("setRoomInfo", roomsInfo[room]);
            addLogRoom(room, message, socket);
        } else socket.emit("roomWasDeleted", room);
    };

    const createRoom = function (room) {
        const socket = this;
        const message = `room ${room} is created by socket ${socket.id}`;
        socket.join(room);
        addLogRoom(room, message, socket);
    };

    const editHref = function (room, href) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} changing href: ${href}`;
            roomsInfo[room].activeUrl = href;
            addLogRoom(room, message, socket);
            io.in(room).emit("setHref", href);
        }
    };
    const changePauseVideo = function (room, pause) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} set ${ pause ? "pause" : "play" } video`;
            roomsInfo[room].isPause = pause;
            addLogRoom(room, message, socket);
            io.in(room).emit("setPause", pause);
        }
    };
    // const changeNextVideo = () => {
    // }
    // const changePreviousVideo = () => {
    // }

    const changeMute = function (room, mute) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} set ${ mute ? "mute" : "unmute" } video`;
            roomsInfo[room].isMuted = mute;
            addLogRoom(room, message, socket);
            io.in(room).emit("setMute", mute);
        }
    };
    const changeVolume = function (room, volume) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} set ${volume}% volume for video`;
            roomsInfo[room].volume = volume;
            addLogRoom(room, message, socket);
            io.in(room).emit("setVolume", volume);
        }
    };
    // const changeGetPlayerMode = () => {
    // }
    return {
        getAllRooms,
        deleteRoom,
        addLogRoom,
        leaveRoom,
        joinRoom,
        editHref,
        createRoom,
        getRoomInfo,
        changeMute,
        changePauseVideo,
        changeVolume,
    };
};
