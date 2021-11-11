require("dotenv").config();

const express = require("express");
const { createServer } = require("http");
const cors = require("cors");

const errorMiddleware = require("./middleware/error-middleware");
const logMiddleware = require("./middleware/log-middleware");
const router = require("./routers/index");
const {io} = require('./handler/indexHandler')
// const { initDatabase } = require("./database/index");

const serverPort = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use(logMiddleware);
app.use('/api', router);
app.use(errorMiddleware);

// createSecretCode();
// initDatabase();

server.listen(serverPort, () =>
  console.info(`Server is listening on port: ${serverPort}`)
);
io.listen(server)

module.exports = server;
