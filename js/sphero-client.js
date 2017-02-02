import eventPublisher from "./publisher";
import socketIOClient from "socket.io-client";

class SpheroClient {
  constructor() {
    this.clientKey = null;
    this.socket = null;
  }
  connect(wsHost) {
    if (this.socket !== null) return;
    this.socket = new socketIOClient(wsHost);
    this.socket.on("connect", () => {
      eventPublisher.publish("ws-connected");
      eventPublisher.subscribe("currentCommands", commands => {
        this.socket.emit("commands", commands);
      });
    }, () => {
      eventPublisher.publish("ws-error");
    });
    this.socket.on("hp", hp => {
      eventPublisher.publish("hp", hp);
    });
    this.socket.on("gameState", gameState => {
      eventPublisher.publish("gameState", gameState);
    });
    this.socket.on("rankingState", rankingState => {
      eventPublisher.publish("rankingState", rankingState);
    });
    this.socket.on("ranking", playerState => {
      eventPublisher.publish("playerState", playerState);
    });
    this.socket.on("availableCommandsCount", count => {
      eventPublisher.publish("availableCommandsCount", count);
    });
    this.socket.on("oni", isOni => {
      eventPublisher.publish("oni", isOni);
    });
    this.socket.on("clientKey", key => {
      this.clientKey = key;
    });
    this.socket.on("acceptName", name => {
      eventPublisher.publish("acceptName", name);
    });
    this.socket.on("rejectName", () => {
      eventPublisher.publish("rejectName", name);
    });
    this.socket.on("color", color => {
      eventPublisher.publish("color", color);
    });
  }
  requestName(name) {
    if (this.socket !== null) {
      this.socket.emit("requestName", name);
    }
  }
  useDefinedName(name) {
    if (this.socket !== null) {
      this.socket.emit("useDefinedName", name);
    }
  }
}

export default new SpheroClient();

