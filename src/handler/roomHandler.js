const roomsInfo = {};
const getRoomLogs = (room) => roomsInfo[room].logs;
const getRoomInfo = (room) => roomsInfo[room] || "Room wasn't found";

module.exports = (io) => {
  const getAllRooms = () => {
    const arr = Array.from(io.sockets.adapter.rooms);
    const filtered = arr.filter((room) => !room[1].has(room[0]));
    const rooms = filtered.map((i) => i[0]);
    return rooms;
  };

  const deleteRoom = function (room) {
    const socket = this;
    if (roomsInfo[room] && socket.id === roomsInfo[room].hostSocketId) {
      io.of('/').to(room).emit("roomIsDeliting", room)
      io.of('/').to(room).disconnectSockets(true)
      console.log(`clients`, clients)
      // clients.forEach(socketId => {
      //   const client = io.of('/').sockets.get(socketId)
      //   client && client.leave(room)
      // });
      delete roomsInfo[room];
      console.log(`room ${room} was delete`)
    }
  };

  const addLogRoom = function (room, message, socket = this) {
    console.info(message);
    if (roomsInfo[room] && roomsInfo[room].logs) {
      roomsInfo[room].logs.push(message);
    } else {
      roomsInfo[room] = {
        logs: [message],
        href: "none",
        hostSocketId: socket.id,
      };
    }
    io.in(room).emit("sendLog", message);
  };

  const leaveRoom = function (room) {
    const socket = this;
    const message = `socket ${socket.id} has leaved room ${room}`;
    socket.leave(room);
    addLogRoom(room, message, socket);
  };

  const joinRoom = function (room) {
    const socket = this;
    const message = `socket ${socket.id} has joined room ${room}`;
    socket.join(room)
    addLogRoom(room, message, socket);
  };

  const createRoom = function (room) {
    const socket = this;
    const message = `room ${room} is created by socket ${socket.id}`;
    socket.join(room);
    addLogRoom(room, message, socket);
  };

  const editHref = function (room, href) {
    const socket = this;
    const message = `socket ${socket.id} in room ${room} changing href: ${href}`;
    if (roomsInfo[room]) {
      roomsInfo[room].href = href;
      addLogRoom(room, message, socket);
      io.in(room).emit("setHref", href);
    }
  };

  return {
    getAllRooms,
    deleteRoom,
    addLogRoom,
    leaveRoom,
    joinRoom,
    editHref,
    createRoom,
    getRoomLogs,
    getRoomInfo,
  };
};
