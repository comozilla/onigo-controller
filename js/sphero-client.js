import eventPublisher from "./publisher";
const Sphero = sphero;

function SpheroClient(wsHost) {
  this.wsHost = wsHost;
  this.clientKey = null;

  if (typeof Sphero === "undefined") {
    eventPublisher.publish("ws-not-found");
  } else {
    this.orb = new Sphero();
    this.orb.connect(this.wsHost, () => {
      eventPublisher.publish("ws-connected");
      this.orb.color("red");
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
    this.orb.listenCustomMessage("hp", data => {
      eventPublisher.publish("hp", data.hp);
    });
    this.orb.listenCustomMessage("gameState", data => {
      eventPublisher.publish("gameState", data.gameState);
    });
    this.orb.listenCustomMessage("availableCommandsCount", data => {
      eventPublisher.publish("availableCommandsCount", data.count);
    });
    this.orb.listenCustomMessage("oni", enable => {
      eventPublisher.publish("oni", enable);
    });
    this.orb.listenCustomMessage("clientKey", key => {
      this.clientKey = key;
    });
  }
}

export default SpheroClient;

