import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars"

import indexRouter from "./src/routers/index.router.js";
import socketCb from "./src/routers/index.socket.js"
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js";
import __dirname from './utils.js';


const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
//creo un servidor de node,con el método nativo createServer,con las configuraciones del servidor express
const nodeServer = createServer(server);
//creo un servidor tcp, construyendo una instancia del servidor de socket pasando como "base" el servidor de node (ya que tcp, está basado en HTPP)
const socketServer = new Server(nodeServer)
nodeServer.listen(port, ready);
socketServer.on("connection", socketCb)
export {socketServer}


//estructura código handlebars
server.engine("handlebars", engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/src/views')



server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname+"/public"))
server.use(morgan("dev"));


server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);