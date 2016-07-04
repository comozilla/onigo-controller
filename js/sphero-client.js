import eventPublisher from "./publisher";
const Sphero = sphero;

function SpheroClient(wsHost) {
  this.speedOfAccuracy = 5;
  this.degreeOfAccuracy = 5;
  this.sendInterval = 100;
  this.isBreaking = false;
  this.wsHost = wsHost;

  this.beforeDegree = 0;
  this.degree = 0;

  this.beforeSpeed = 0;
  this.speed = 0;

  if (typeof Sphero === "undefined") {
    eventPublisher.publish("ws-not-found");
  } else {
    this.orb = new Sphero();
    this.orb.connect(this.wsHost, () => {
      eventPublisher.publish("ws-connected");
      this.orb.color("red");
      eventPublisher.subscribe("rollingDegree", (degree) => {
        this.beforeDegree = this.degree;
        this.degree = degree;
        this.roll();
      });
      eventPublisher.subscribe("rollingSpeed", (speed) => {
        this.beforeSpeed = this.speed;
        this.speed = speed;
        this.roll();
      });

      eventPublisher.subscribe("spheroState", (spheroState) => {
        if (spheroState === "idling") {
          this.orb.finishCalibration();
        } else {
          this.orb.startCalibration();
        }
      });
    }, () => {
      eventPublisher.publish("ws-error");
    });
    this.orb.listenCustomMessage("hp", (data) => {
      eventPublisher.publish("hp", data.hp);
    });
    this.orb.listenCustomMessage("gameState", (data) => {
      eventPublisher.publish("gameState", data.gameState);
    });
    this.orb.listenCustomMessage("availableCommandsCount", (data) => {
      eventPublisher.publish("availableCommandsCount", data.count);
    });
  }
}

SpheroClient.prototype.roll = function() {
  if (this.isBreaking) {
    return;
  }
  if (Math.abs(this.speed - this.beforeSpeed) > this.speedOfAccuracy ||
      Math.abs(this.degree - this.beforeDegree) > this.degreeOfAccuracy) {
    this.isBreaking = true;
    setTimeout(() => {
      this.orb.roll(this.speed, this.degree);
      this.isBreaking = false;
    }, this.sendInterval);
  }
};

export default SpheroClient;

