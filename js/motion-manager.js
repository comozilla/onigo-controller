import eventPublisher from "./publisher";

function MotionManager() {
  this.motions = {};
  eventPublisher.subscribe("saveMotion", (motion) => {
    this.update(motion.motionId, motion.motionName, motion.motion);
  });
}

MotionManager.prototype.update = function(motionId, motionName, motion) {
  const editedMotionName = typeof motionName === "string" && motionName !== "" ?
    motionName : "無名のモーション";
  const editedMotion = typeof motion === "undefined" ? "" : motion;
  this.motions[motionId] = {
    motionName: editedMotionName,
    motion: editedMotion
  };
};

MotionManager.prototype.contains = function(motionId) {
  return typeof this.motions[motionId] !== "undefined";
};

MotionManager.prototype.get = function(motionId) {
  if (!this.contains(motionId)) {
    throw new Error("モーション " + motionId + " は、存在しないので取得できませんでした。 ");
  }
  return this.motions[motionId];
};

export default MotionManager;

