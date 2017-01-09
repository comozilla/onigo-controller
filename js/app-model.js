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

    eventPublisher.subscribeModel("mode", mode => {
      this.mode = mode;
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
    eventPublisher.publish("mode", this.mode === mode.making ? mode.playing : mode.making);
  }
}

export default new AppModel();
