import eventPublisher from "./publisher";
import Motion from "./motion";

function Backup() {
  this.motions = {};
  eventPublisher.subscribe("compile", args => {
    this.motions[args.motion.motionId] = {
      code: args.motion.motion.motionCode,
      blockName: args.motion.motion.motionName
    };
    this.save();
  });
}

Backup.prototype.restore = function() {
  if (!this.has()) {
    throw new Error("restoreしようとしましたが、backupは存在しません");
  }
  const backup = JSON.parse(localStorage.getItem("backup"));
  Object.keys(backup).forEach(motionId => {
    eventPublisher.publish("saveMotion", {
      motionId: parseInt(motionId),
      motion: new Motion(backup[motionId].blockName, backup[motionId].code)
    });
  });
};

Backup.prototype.has = function() {
  return localStorage.getItem("backup") !== null;
};

Backup.prototype.save = function() {
  localStorage.setItem("backup", JSON.stringify(this.motions));
};

Backup.prototype.clear = function() {
  localStorage.removeItem("backup");
};

export default Backup;
