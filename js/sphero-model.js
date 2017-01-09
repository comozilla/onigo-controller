import eventPublisher from "./publisher";

class SpheroModel {
  constructor() {
    this.hp = 0;
    this.color = "N/A";

    eventPublisher.subscribeModel("hp", hp => {
      this.hp = hp;
    });

    eventPublisher.subscribeModel("color", color => {
      this.color = color;
    });
  }
}

export default new SpheroModel();
