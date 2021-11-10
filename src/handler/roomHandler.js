const roomsInfo = {};
const getRoomLogs = (room) => roomsInfo[room].logs;
const getRoomInfo = (room) => roomsInfo[room] || "Room wasn't found";

module.exports = (io) => {
  const socket = this;

  const addLogRoom = (room, message) => {
    console.info(message);
    if (roomsInfo[room] && roomsInfo[room].logs) {
      roomsInfo[room].logs.push(message);
    } else {
      roomsInfo[room] = {
        logs: [message],
        href: "none",
      };
    }
    socket.to(room).emit("sendLog", roomsInfo[room].logs);
  };

  const leaveRoom = (room) => {
    const message = `socket ${socket.id} has leaved room ${room}`;
    socket.leave(room);
    addLogRoom(room, message, socket);
  };

  const joinRoom = (room) => {
    const message = `socket ${socket.id} has joined room ${room}`;
    socket.join(room);
    addLogRoom(room, message, socket);
    socket.emit("setHref", roomsInfo[room].href);
  };

  const createRoom = (room) => {
    const message = `room ${room} was created`;
    socket.join(room);
    addLogRoom(room, message, socket);
  };

  const editHref = (room) => {
    const message = `socket ${socket.id} in room ${room} changing href: ${href}`;
    roomsInfo[room].href = href;
    addLogRoom(room, message, socket);
    socket.to(room).emit("setHref", href);
  };

  return {
    addLogRoom,
    leaveRoom,
    joinRoom,
    editHref,
    createRoom,
    getRoomLogs,
    getRoomInfo,
  };
};
