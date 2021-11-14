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
        if (roomsInfo[room] && socket.id === roomsInfo[room].hostSocketId) {
            io.of('/').to(room).emit("roomWasDeleted", room)
            io.of('/').to(room).disconnectSockets(true)
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
        const roomInfo = getRoomInfo(room)
        if (roomInfo) {
            const message = `socket ${socket.id} has joined room ${room}`;
            socket.join(room)
            return addLogRoom(room, message, socket);
        } else socket.emit("roomWasDeleted", room)
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
            roomsInfo[room].href = href;
            addLogRoom(room, message, socket);
            io.in(room).emit("setHref", href);
        }
    };

    const changeCueVideoById = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method cueVideoById: ${val}`;
            roomsInfo[room].cueVideoById = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onCueVideoById", val);
        }
    };

    const changeLoadVideoById = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method loadVideoById: ${val}`;
            roomsInfo[room].loadVideoById = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onLoadVideoById", val);
        }
    };

    const changeCueVideoByUrl = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method cueVideoByUrl: ${val}`;
            roomsInfo[room].cueVideoByUrl = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onCueVideoByUrl", val);
        }
    };

    const changeLoadVideoByUrl = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method loadVideoByUrl: ${val}`;
            roomsInfo[room].loadVideoByUrl = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onLoadVideoByUrl", val);
        }
    };

    const changePlayVideo = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method playVideo: ${val}`;
            roomsInfo[room].playVideo = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onPlayVideo", val);
        }
    };

    const changePauseVideo = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method pauseVideo: ${val}`;
            roomsInfo[room].pauseVideo = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onPauseVideo", val);
        }
    };

    const changeStopVideo = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method stopVideo: ${val}`;
            roomsInfo[room].stopVideo = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onStopVideo", val);
        }
    };

    const changeClearVideo = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method clearVideo: ${val}`;
            roomsInfo[room].clearVideo = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onClearVideo", val);
        }
    };

    const changeGetVideoBytesLoaded = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getVideoBytesLoaded: ${val}`;
            roomsInfo[room].getVideoBytesLoaded = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetVideoBytesLoaded", val);
        }
    };

    const changeGetVideoBytesTotal = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getVideoBytesTotal: ${val}`;
            roomsInfo[room].getVideoBytesTotal = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetVideoBytesTotal", val);
        }
    };

    const changeGetVideoLoadedFraction = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getVideoLoadedFraction: ${val}`;
            roomsInfo[room].getVideoLoadedFraction = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetVideoLoadedFraction", val);
        }
    };

    const changeGetVideoStartBytes = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getVideoStartBytes: ${val}`;
            roomsInfo[room].getVideoStartBytes = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetVideoStartBytes", val);
        }
    };

    const changeCuePlaylist = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method cuePlaylist: ${val}`;
            roomsInfo[room].cuePlaylist = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onCuePlaylist", val);
        }
    };

    const changeLoadPlaylist = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method loadPlaylist: ${val}`;
            roomsInfo[room].loadPlaylist = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onLoadPlaylist", val);
        }
    };

    const changeNextVideo = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method nextVideo: ${val}`;
            roomsInfo[room].nextVideo = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onNextVideo", val);
        }
    };

    const changePreviousVideo = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method previousVideo: ${val}`;
            roomsInfo[room].previousVideo = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onPreviousVideo", val);
        }
    };

    const changePlayVideoAt = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method playVideoAt: ${val}`;
            roomsInfo[room].playVideoAt = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onPlayVideoAt", val);
        }
    };

    const changeSetShuffle = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method setShuffle: ${val}`;
            roomsInfo[room].setShuffle = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onSetShuffle", val);
        }
    };

    const changeSetLoop = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method setLoop: ${val}`;
            roomsInfo[room].setLoop = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onSetLoop", val);
        }
    };

    const changeGetPlaylist = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getPlaylist: ${val}`;
            roomsInfo[room].getPlaylist = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetPlaylist", val);
        }
    };

    const changeGetPlaylistIndex = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getPlaylistIndex: ${val}`;
            roomsInfo[room].getPlaylistIndex = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetPlaylistIndex", val);
        }
    };

    const changeGetPlaylistId = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getPlaylistId: ${val}`;
            roomsInfo[room].getPlaylistId = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetPlaylistId", val);
        }
    };

    const changeLoadModule = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method loadModule: ${val}`;
            roomsInfo[room].loadModule = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onLoadModule", val);
        }
    };

    const changeUnloadModule = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method unloadModule: ${val}`;
            roomsInfo[room].unloadModule = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onUnloadModule", val);
        }
    };

    const changeSetOption = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method setOption: ${val}`;
            roomsInfo[room].setOption = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onSetOption", val);
        }
    };

    const changeMute = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method mute: ${val}`;
            roomsInfo[room].mute = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onMute", val);
        }
    };

    const changeUnMute = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method unMute: ${val}`;
            roomsInfo[room].unMute = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onUnMute", val);
        }
    };

    const changeIsMuted = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method isMuted: ${val}`;
            roomsInfo[room].isMuted = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onIsMuted", val);
        }
    };

    const changeSetVolume = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method setVolume: ${val}`;
            roomsInfo[room].setVolume = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onSetVolume", val);
        }
    };

    const changeGetVolume = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getVolume: ${val}`;
            roomsInfo[room].getVolume = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetVolume", val);
        }
    };

    const changeSeekTo = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method seekTo: ${val}`;
            roomsInfo[room].seekTo = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onSeekTo", val);
        }
    };

    const changeGetPlayerMode = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getPlayerMode: ${val}`;
            roomsInfo[room].getPlayerMode = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetPlayerMode", val);
        }
    };

    const changeGetPlayerState = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getPlayerState: ${val}`;
            roomsInfo[room].getPlayerState = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetPlayerState", val);
        }
    };

    const changeGetPlaybackRate = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getPlaybackRate: ${val}`;
            roomsInfo[room].getPlaybackRate = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetPlaybackRate", val);
        }
    };

    const changeSetPlaybackRate = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method setPlaybackRate: ${val}`;
            roomsInfo[room].setPlaybackRate = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onSetPlaybackRate", val);
        }
    };

    const changeGetAvailablePlaybackRates = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getAvailablePlaybackRates: ${val}`;
            roomsInfo[room].getAvailablePlaybackRates = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetAvailablePlaybackRates", val);
        }
    };

    const changeGetPlaybackQuality = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getPlaybackQuality: ${val}`;
            roomsInfo[room].getPlaybackQuality = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetPlaybackQuality", val);
        }
    };

    const changeSetPlaybackQuality = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method setPlaybackQuality: ${val}`;
            roomsInfo[room].setPlaybackQuality = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onSetPlaybackQuality", val);
        }
    };

    const changeGetAvailableQualityLevels = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getAvailableQualityLevels: ${val}`;
            roomsInfo[room].getAvailableQualityLevels = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetAvailableQualityLevels", val);
        }
    };

    const changeGetCurrentTime = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getCurrentTime: ${val}`;
            roomsInfo[room].getCurrentTime = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetCurrentTime", val);
        }
    };

    const changeGetDuration = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getDuration: ${val}`;
            roomsInfo[room].getDuration = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetDuration", val);
        }
    };

    const changeRemoveEventListener = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method removeEventListener: ${val}`;
            roomsInfo[room].removeEventListener = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onRemoveEventListener", val);
        }
    };

    const changeGetDebugText = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getDebugText: ${val}`;
            roomsInfo[room].getDebugText = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetDebugText", val);
        }
    };

    const changeGetVideoData = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getVideoData: ${val}`;
            roomsInfo[room].getVideoData = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetVideoData", val);
        }
    };

    const changeAddCueRange = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method addCueRange: ${val}`;
            roomsInfo[room].addCueRange = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onAddCueRange", val);
        }
    };

    const changeRemoveCueRange = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method removeCueRange: ${val}`;
            roomsInfo[room].removeCueRange = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onRemoveCueRange", val);
        }
    };

    const changeGetApiInterface = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getApiInterface: ${val}`;
            roomsInfo[room].getApiInterface = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetApiInterface", val);
        }
    };

    const changeShowVideoInfo = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method showVideoInfo: ${val}`;
            roomsInfo[room].showVideoInfo = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onShowVideoInfo", val);
        }
    };

    const changeHideVideoInfo = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method hideVideoInfo: ${val}`;
            roomsInfo[room].hideVideoInfo = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onHideVideoInfo", val);
        }
    };

    const changeIsVideoInfoVisible = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method isVideoInfoVisible: ${val}`;
            roomsInfo[room].isVideoInfoVisible = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onIsVideoInfoVisible", val);
        }
    };

    const changeGetSphericalProperties = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getSphericalProperties: ${val}`;
            roomsInfo[room].getSphericalProperties = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetSphericalProperties", val);
        }
    };

    const changeSetSphericalProperties = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method setSphericalProperties: ${val}`;
            roomsInfo[room].setSphericalProperties = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onSetSphericalProperties", val);
        }
    };

    const changeGetVideoUrl = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getVideoUrl: ${val}`;
            roomsInfo[room].getVideoUrl = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetVideoUrl", val);
        }
    };

    const changeGetMediaReferenceTime = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getMediaReferenceTime: ${val}`;
            roomsInfo[room].getMediaReferenceTime = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetMediaReferenceTime", val);
        }
    };

    const changeGetSize = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method getSize: ${val}`;
            roomsInfo[room].getSize = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onGetSize", val);
        }
    };

    const changeLogImaAdEvent = function (room, val) {
        const socket = this;
        if (roomsInfo[room]) {
            const message = `socket ${socket.id} in room ${room} emit method logImaAdEvent: ${val}`;
            roomsInfo[room].logImaAdEvent = val;
            addLogRoom(room, message, socket);
            io.in(room).emit("onLogImaAdEvent", val);
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
        getRoomInfo,
        changeCueVideoById,
        changeLoadVideoById,
        changeCueVideoByUrl,
        changeLoadVideoByUrl,
        changePlayVideo,
        changePauseVideo,
        changeStopVideo,
        changeClearVideo,
        changeGetVideoBytesLoaded,
        changeGetVideoBytesTotal,
        changeGetVideoLoadedFraction,
        changeGetVideoStartBytes,
        changeCuePlaylist,
        changeLoadPlaylist,
        changeNextVideo,
        changePreviousVideo,
        changePlayVideoAt,
        changeSetShuffle,
        changeSetLoop,
        changeGetPlaylist,
        changeGetPlaylistIndex,
        changeGetPlaylistId,
        changeLoadModule,
        changeUnloadModule,
        changeSetOption,
        changeMute,
        changeUnMute,
        changeIsMuted,
        changeSetVolume,
        changeGetVolume,
        changeSeekTo,
        changeGetPlayerMode,
        changeGetPlayerState,
        changeGetPlaybackRate,
        changeSetPlaybackRate,
        changeGetAvailablePlaybackRates,
        changeGetPlaybackQuality,
        changeSetPlaybackQuality,
        changeGetAvailableQualityLevels,
        changeGetCurrentTime,
        changeGetDuration,
        changeRemoveEventListener,
        changeGetDebugText,
        changeGetVideoData,
        changeAddCueRange,
        changeRemoveCueRange,
        changeGetApiInterface,
        changeShowVideoInfo,
        changeHideVideoInfo,
        changeIsVideoInfoVisible,
        changeGetSphericalProperties,
        changeSetSphericalProperties,
        changeGetVideoUrl,
        changeGetMediaReferenceTime,
        changeGetSize,
        changeLogImaAdEvent
    };
};
