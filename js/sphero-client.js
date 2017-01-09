import eventPublisher from "./publisher";

class SpheroClient {
  constructor() {
    this.clientKey = null;
    this.orb = null;
  }
  connect(wsHost) {
    if (typeof sphero === "undefined") {
      eventPublisher.publish("ws-not-found");
    } else {
      this.orb = new sphero();
      this.orb.connect(wsHost, () => {
        eventPublisher.publish("ws-connected");
        eventPublisher.subscribe("spheroState", spheroState => {
          if (spheroState === "idling") {
            this.orb.finishCalibration();
          } else if (spheroState === "calibrating") {
            this.orb.startCalibration();
          }
        });
        eventPublisher.subscribe("changeCurrentCommands", commands => {
          this.orb.sendCustomMessage("commands", commands);
        });
      }, () => {
        eventPublisher.publish("ws-error");
      });
      this.orb.listenCustomMessage("hp", hp => {
        eventPublisher.publish("hp", hp);
      });
      this.orb.listenCustomMessage("gameState", gameState => {
        eventPublisher.publish("gameState", gameState);
      });
      this.orb.listenCustomMessage("rankingState", rankingState => {
        eventPublisher.publish("rankingState", rankingState);
      });
      this.orb.listenCustomMessage("ranking", ranking => {
        eventPublisher.publish("ranking", ranking);
      });
      this.orb.listenCustomMessage("availableCommandsCount", count => {
        eventPublisher.publish("availableCommandsCount", count);
      });
      this.orb.listenCustomMessage("oni", isOni => {
        eventPublisher.publish("oni", isOni);
      });
      this.orb.listenCustomMessage("clientKey", key => {
        this.clientKey = key;
      });
      this.orb.listenCustomMessage("acceptName", name => {
        eventPublisher.publish("acceptName", name);
      });
      this.orb.listenCustomMessage("rejectName", () => {
        eventPublisher.publish("rejectName", name);
      });
      this.orb.listenCustomMessage("color", color => {
        eventPublisher.publish("color", color);
      });
    }
  }
  requestName(name) {
    if (this.orb !== null) {
      this.orb.sendCustomMessage("requestName", name);
    }
  }
  useDefinedName(name) {
    if (this.orb !== null) {
      this.orb.sendCustomMessage("useDefinedName", name);
    }
  }
}

export default new SpheroClient();

