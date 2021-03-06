require("dotenv").config();

const express = require("express");
const { createServer } = require("http");
const cors = require("cors");

const errorMiddleware = require("./middleware/error-middleware");
const logMiddleware = require("./middleware/log-middleware");
const router = require("./routers/index");
const {io} = require('./handler/indexHandler')

const serverPort = process.env.PORT || 3000;
const serverHost = process.env.HOSTNAME || 'localhost';
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(logMiddleware);
app.use('/api', router);
app.use(errorMiddleware);

server.listen(serverPort, serverHost, () =>
  console.info(`Server is listening on http://${serverHost}:${serverPort}`)
);
io.listen(server)

module.exports = server;
