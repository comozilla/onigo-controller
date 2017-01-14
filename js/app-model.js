import eventPublisher from "./publisher";
import mode from "./mode";

class AppModel {
  constructor() {
    this.mode = mode.making;
    this.gameState = "";
    this.openingMotionId = -1;
    this.currentLogs = [];
    this.hp = 0;
    this.color = "N/A";
    this.isOni = false;
    this.currentCommands = [];
    this.server = "";

    eventPublisher.subscribeModel("mode", newMode => {
      this.mode = newMode;

      // mode が playing になったら、block の編集を終了する
      if (newMode === mode.playing) {
        this.changeOpeningMotionId(-1);
      }
    });
    eventPublisher.subscribeModel("gameState", gameState => {
      this.gameState = gameState;
    });
    eventPublisher.subscribeModel("openingMotionId", motionId => {
      this.openingMotionId = motionId;
    });
    eventPublisher.subscribeModel("hp", hp => {
      this.hp = hp;
    });
    eventPublisher.subscribeModel("color", color => {
      this.color = color;
    });
    eventPublisher.subscribeModel("oni", isOni => {
      this.isOni = isOni;
    });
    eventPublisher.subscribeModel("currentCommands", commands => {
      this.currentCommands = commands;
    });
    eventPublisher.subscribeModel("server", server => {
      this.server = server;
    });
  }
  changeOpeningMotionId(motionId) {
    if (this.openingMotionId !== motionId) {
      eventPublisher.publish("openingMotionId", motionId);
    }
  }
  changeCurrentLogs(currentLogs) {
    if (this.currentLogs !== currentLogs) {
      eventPublisher.publish("currentLogs", currentLogs);
    }
  }
  toggleMode() {
    eventPublisher.publish("mode",
      this.mode === mode.making ? mode.playing : mode.making);
  }
  changeCurrentCommands(commands) {
    if (this.currentCommands !== commands) {
      eventPublisher.publish("currentCommands", commands);
    }
  }
  changeServer(server) {
    if (this.server !== server) {
      eventPublisher.publish("server", server);
    }
  }
}

export default new AppModel();
