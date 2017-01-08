import eventPublisher from "./publisher";
import mode from "./mode";

class AppModel {
  constructor() {
    this.mode = mode.making;
    this.gameState = "";

    eventPublisher.subscribeModel("mode", mode => {
      this.mode = mode;
    });
    eventPublisher.subscribeModel("gameState", gameState => {
      this.gameState = gameState;
    });
  }
}

export default new AppModel();
