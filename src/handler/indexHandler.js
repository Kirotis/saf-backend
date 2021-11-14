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
    socket.on("changeCueVideoById", roomHandler.changeCueVideoById);
    socket.on("changeLoadVideoById", roomHandler.changeLoadVideoById);
    socket.on("changeCueVideoByUrl", roomHandler.changeCueVideoByUrl);
    socket.on("changeLoadVideoByUrl", roomHandler.changeLoadVideoByUrl);
    socket.on("changePlayVideo", roomHandler.changePlayVideo);
    socket.on("changePauseVideo", roomHandler.changePauseVideo);
    socket.on("changeStopVideo", roomHandler.changeStopVideo);
    socket.on("changeClearVideo", roomHandler.changeClearVideo);
    socket.on("changeGetVideoBytesLoaded", roomHandler.changeGetVideoBytesLoaded);
    socket.on("changeGetVideoBytesTotal", roomHandler.changeGetVideoBytesTotal);
    socket.on("changeGetVideoLoadedFraction", roomHandler.changeGetVideoLoadedFraction);
    socket.on("changeGetVideoStartBytes", roomHandler.changeGetVideoStartBytes);
    socket.on("changeCuePlaylist", roomHandler.changeCuePlaylist);
    socket.on("changeLoadPlaylist", roomHandler.changeLoadPlaylist);
    socket.on("changeNextVideo", roomHandler.changeNextVideo);
    socket.on("changePreviousVideo", roomHandler.changePreviousVideo);
    socket.on("changePlayVideoAt", roomHandler.changePlayVideoAt);
    socket.on("changeSetShuffle", roomHandler.changeSetShuffle);
    socket.on("changeSetLoop", roomHandler.changeSetLoop);
    socket.on("changeGetPlaylist", roomHandler.changeGetPlaylist);
    socket.on("changeGetPlaylistIndex", roomHandler.changeGetPlaylistIndex);
    socket.on("changeGetPlaylistId", roomHandler.changeGetPlaylistId);
    socket.on("changeLoadModule", roomHandler.changeLoadModule);
    socket.on("changeUnloadModule", roomHandler.changeUnloadModule);
    socket.on("changeSetOption", roomHandler.changeSetOption);
    socket.on("changeMute", roomHandler.changeMute);
    socket.on("changeUnMute", roomHandler.changeUnMute);
    socket.on("changeIsMuted", roomHandler.changeIsMuted);
    socket.on("changeSetVolume", roomHandler.changeSetVolume);
    socket.on("changeGetVolume", roomHandler.changeGetVolume);
    socket.on("changeSeekTo", roomHandler.changeSeekTo);
    socket.on("changeGetPlayerMode", roomHandler.changeGetPlayerMode);
    socket.on("changeGetPlayerState", roomHandler.changeGetPlayerState);
    socket.on("changeGetPlaybackRate", roomHandler.changeGetPlaybackRate);
    socket.on("changeSetPlaybackRate", roomHandler.changeSetPlaybackRate);
    socket.on("changeGetAvailablePlaybackRates", roomHandler.changeGetAvailablePlaybackRates);
    socket.on("changeGetPlaybackQuality", roomHandler.changeGetPlaybackQuality);
    socket.on("changeSetPlaybackQuality", roomHandler.changeSetPlaybackQuality);
    socket.on("changeGetAvailableQualityLevels", roomHandler.changeGetAvailableQualityLevels);
    socket.on("changeGetCurrentTime", roomHandler.changeGetCurrentTime);
    socket.on("changeGetDuration", roomHandler.changeGetDuration);
    socket.on("changeRemoveEventListener", roomHandler.changeRemoveEventListener);
    socket.on("changeGetDebugText", roomHandler.changeGetDebugText);
    socket.on("changeGetVideoData", roomHandler.changeGetVideoData);
    socket.on("changeAddCueRange", roomHandler.changeAddCueRange);
    socket.on("changeRemoveCueRange", roomHandler.changeRemoveCueRange);
    socket.on("changeGetApiInterface", roomHandler.changeGetApiInterface);
    socket.on("changeShowVideoInfo", roomHandler.changeShowVideoInfo);
    socket.on("changeHideVideoInfo", roomHandler.changeHideVideoInfo);
    socket.on("changeIsVideoInfoVisible", roomHandler.changeIsVideoInfoVisible);
    socket.on("changeGetSphericalProperties", roomHandler.changeGetSphericalProperties);
    socket.on("changeSetSphericalProperties", roomHandler.changeSetSphericalProperties);
    socket.on("changeGetVideoUrl", roomHandler.changeGetVideoUrl);
    socket.on("changeGetMediaReferenceTime", roomHandler.changeGetMediaReferenceTime);
    socket.on("changeGetSize", roomHandler.changeGetSize);
    socket.on("changeLogImaAdEvent", roomHandler.changeLogImaAdEvent)
};

io.on("connection", onConnection);

module.exports = {
    getAllRooms, deleteRoom, getRoomInfo, io
}