import eventPublisher from "./publisher";

function SpheroClient(wsHost) {
  this.speedOfAccuracy = 5;
  this.degreeOfAccuracy = 5;
  this.sendInterval = 100;
  this._isBreaking = false;
  this.wsHost = wsHost;

  this._beforeDegree = 0;
  this.degree = 0;

  this._beforeSpeed = 0;
  this.speed = 0;

  if (typeof sphero === "undefined") {
    eventPublisher.publish("ws-not-found");
  } else {
    this.orb = new sphero();
    this.orb.connect(this.wsHost, () => {
      eventPublisher.publish("ws-connected");
      this.orb.color("red");
      eventPublisher.subscribe("rollingDegree", (degree) => {
        this._beforeDegree = this.degree;
        this.degree = degree;
        this._roll();
      });
      eventPublisher.subscribe("rollingSpeed", (speed) => {
        this._beforeSpeed = this.speed;
        this.speed = speed;
        this._roll();
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
      console.log(data);
      eventPublisher.publish("availableCommandsCount", data.count);
    });
  }
}

SpheroClient.prototype._roll = function() {
  if (this._isBreaking) {
    return;
  }
  if (Math.abs(this.speed - this._beforeSpeed) > this.speedOfAccuracy ||
      Math.abs(this.degree - this._beforeDegree) > this.degreeOfAccuracy) {
    this._isBreaking = true;
    setTimeout(() => {
      this.orb.roll(this.speed, this.degree);
      this._isBreaking = false;
    }, this.sendInterval);
  }
};

export default SpheroClient;

