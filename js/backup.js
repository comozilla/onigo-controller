import eventPublisher from "./publisher";

function Backup() {
  this.motions = {};
  eventPublisher.subscribe("compile", args => {
    this.motions[args.motion.motionId] = {
      code: args.motion.motion.motionCode,
      blockName: args.motion.motion.motionName
    };
    save.call(this);
  });
}

Backup.prototype.restore = function() {
};

function save() {
  if (localStorage.length >= 10) {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!isNaN(key)) {
        keys.push(parseInt(key));
      }
    }
    localStorage.removeItem(keys.sort()[0]);
  }
  localStorage.setItem(Date.now(), this.motions);
};

module.exports = Backup;
