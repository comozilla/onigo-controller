import eventPublisher from "./publisher";

function MotionManager() {
  this.motions = {};
  eventPublisher.subscribe("saveMotion", (motion) => {
    this._update(motion.motionId, motion.motionName, motion.motion);
  });
}

MotionManager.prototype._update = function(motionId, motionName, motion) {
  var _motionName = typeof motionName === "string" && motionName !== "" ?
    motionName : "無名のモーション";
  var _motion = typeof motion === "undefined" ? "" : motion;
  this.motions[motionId] = {
    motionName: _motionName,
    motion: _motion
  };
};

MotionManager.prototype.contains = function(motionId) {
  return typeof this.motions[motionId] !== "undefined";
}

MotionManager.prototype.get = function(motionId) {
  if (!this.contains(motionId)) {
    throw new Error("モーション " + motionId + " は、存在しないので取得できませんでした。 ");
  }
  return this.motions[motionId];
}

export default MotionManager;

