import eventPublisher from "./publisher";
import mode from "./mode";

class AppModel {
  constructor() {
    this.mode = mode.making;
    this.gameState = "";
    this.openingMotionId = -1;

    eventPublisher.subscribeModel("mode", mode => {
      this.mode = mode;
    });
    eventPublisher.subscribeModel("gameState", gameState => {
      this.gameState = gameState;
    });
    eventPublisher.subscribeModel("openingMotionId", motionId => {
      this.openingMotionId = motionId;
    });
  }
  changeOpeningMotionId(motionId) {
    if (this.openingMotionId !== motionId) {
      eventPublisher.publish("openingMotionId", motionId);
    }
  }
}

export default new AppModel();
