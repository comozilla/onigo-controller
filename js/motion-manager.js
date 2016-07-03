function MotionManager() {
  this.motions = {};
}

MotionManager.prototype.add = function(motionId, motionName, motion) {
  if (this.contains(motionId)) {
    throw new Error("モーション " + motionId + " は、既に存在するので追加できませんでした。");
  }
  var _motionName = typeof motionName === "string" && motionName !== "" ?
    motionName : "無名のモーション";
  var _motion = typeof motion === "undefined" ? "" : motion;
  this.motions[motionId] = {
    motionName: _motionName,
    motion: _motion
  };
};

MotionManager.prototype.updateMotionName = function(motionId, newMotionName) {

};

MotionManager.prototype.updateMotion = function(motionId, newMotion) {

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

