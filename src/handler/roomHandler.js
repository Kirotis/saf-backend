const roomsInfo = {};
const getRoomInfo = (room) => roomsInfo[room];

module.exports = (io) => {
    const roomMethods = {
        getAllRooms: () => {
            const arr = Array.from(io.sockets.adapter.rooms);
            const filtered = arr.filter((room) => !room[1].has(room[0]));
            const rooms = filtered.map((i) => i[0]);
            return rooms;
        },

        deleteRoom: function (room) {
            const socket = this;
            if (roomsInfo[room] && socket.id === roomsInfo[room].hostSocketId) {
                io.of("/").to(room).emit("roomWasDeleted", room);
                io.of("/").to(room).disconnectSockets(true);
                delete roomsInfo[room];
                console.log(`room ${room} was delete`);
            }
        },

        addLogRoom: function (room, message, socket = this) {
            const date = new Date();
            const logData = {
                message,
                date: date.valueOf(),
            };
            console.info(`(${date.toLocaleString()}) ${message}`);
            if (roomsInfo[room] && roomsInfo[room].logs) {
                roomsInfo[room].logs.push(logData);
            } else {
                roomsInfo[room] = {
                    logs: [logData],
                    activeUrl: "jNQXAC9IVRw",
                    hostSocketId: socket.id,
                    isMuted: false,
                    isPause: true,
                    volume: 25,
                };
            }
            io.in(room).emit("sendLog", logData);
        },

        checkConnection: function (room, socket = this) {
            if (!socket.rooms.has(room)) {
                roomMethods.joinRoom(room, socket);
            }
        },

        leaveRoom: function (room) {
            const socket = this;
            const message = `socket ${socket.id} has leaved room ${room}`;
            socket.leave(room);
            roomMethods.addLogRoom(room, message, socket);
        },

        joinRoom: function (room, socket = this) {
            if (roomsInfo[room]) {
                const message = `socket ${socket.id} has joined room ${room}`;
                socket.join(room);
                socket.emit("setRoomInfo", roomsInfo[room]);
                roomMethods.addLogRoom(room, message, socket);
            } else socket.emit("roomWasDeleted", room);
        },

        createRoom: function (room) {
            const socket = this;
            const message = `room ${room} is created by socket ${socket.id}`;
            socket.join(room);
            roomMethods.addLogRoom(room, message, socket);
            socket.emit("setRoomInfo", roomsInfo[room]);
        },

        editHref: function (room, href) {
            const socket = this;
            roomMethods.checkConnection(room, socket);
            if (roomsInfo[room]) {
                const message = `socket ${socket.id} in room ${room} changing href: ${href}`;
                roomsInfo[room].activeUrl = href;
                roomMethods.addLogRoom(room, message, socket);
                io.in(room).emit("setHref", href);
            }
        },
        changePauseVideo: function (room, pause) {
            const socket = this;
            roomMethods.checkConnection(room, socket);
            if (roomsInfo[room]) {
                const message = `socket ${socket.id} in room ${room} set ${
                    pause ? "pause" : "play"
                } video`;
                roomsInfo[room].isPause = pause;
                roomMethods.addLogRoom(room, message, socket);
                io.in(room).emit("setPause", pause);
            }
        },
        changeNextVideo: function (room) {
            const socket = this;
            roomMethods.checkConnection(room, socket);
            if (roomsInfo[room]) {
                const message = `socket ${socket.id} in room ${room} set next video`;
                roomMethods.addLogRoom(room, message, socket);
                io.in(room).emit("setNextVideo");
            }
        },
        changePreviousVideo: function (room) {
            const socket = this;
            roomMethods.checkConnection(room, socket);
            if (roomsInfo[room]) {
                const message = `socket ${socket.id} in room ${room} set prev video`;
                roomMethods.addLogRoom(room, message, socket);
                io.in(room).emit("setPreviousVideo");
            }
        },

        changePreviousMoment: function (room) {
            const socket = this;
            roomMethods.checkConnection(room, socket);
            if (roomsInfo[room]) {
                const message = `socket ${socket.id} in room ${room} set prev moment`;
                roomMethods.addLogRoom(room, message, socket);
                io.in(room).emit("setPreviousMoment");
            }
        },

        changeNextMoment: function (room) {
            const socket = this;
            roomMethods.checkConnection(room, socket);
            if (roomsInfo[room]) {
                const message = `socket ${socket.id} in room ${room} set next moment`;
                roomMethods.addLogRoom(room, message, socket);
                io.in(room).emit("setNextMoment");
            }
        },

        changeTimeVideo: function (room, seconds, minutes = 0, hour = 0) {
            const socket = this;
            roomMethods.checkConnection(room, socket);
            if (roomsInfo[room]) {
                const message = `socket ${
                    socket.id
                } in room ${room} set time video on ${
                    (hour && hour + ":") || ""
                }${minutes}:${seconds}`;
                roomMethods.addLogRoom(room, message, socket);
                const time = hour * 60 * 60 + minutes * 60 + seconds;
                io.in(room).emit("setTimeVideo", time);
            }
        },

        changeMute: function (room, mute) {
            const socket = this;
            roomMethods.checkConnection(room, socket);
            if (roomsInfo[room]) {
                const message = `socket ${socket.id} in room ${room} set ${
                    mute ? "mute" : "unmute"
                } video`;
                roomsInfo[room].isMuted = mute;
                roomMethods.addLogRoom(room, message, socket);
                io.in(room).emit("setMute", mute);
            }
        },
        changeVolume: function (room, volume) {
            const socket = this;
            roomMethods.checkConnection(room, socket);
            if (roomsInfo[room]) {
                const message = `socket ${socket.id} in room ${room} set ${volume}% volume for video`;
                roomsInfo[room].volume = volume;
                roomMethods.addLogRoom(room, message, socket);
                io.in(room).emit("setVolume", volume);
            }
        },
    };

    return {
        getRoomInfo,
        ...roomMethods,
    };
};
