import eventPublisher from "./publisher"

function Editor(motionManager) {
  if (typeof Editor.instance === "object") {
    return Editor.instance;
  }

  this.openingMotionId = -1;
  this.motionManager = motionManager;

  this.editorContainer = document.getElementById("editor");
  this.saveButton = document.getElementById("editor-save-button");
  this.saveButton.addEventListener("click", () => {
    this.save();
  });
  this.closeButton = document.getElementById("editor-close-button");
  this.closeButton.addEventListener("click", () => {
    this.close();
  });

  this.motionNameElement = document.getElementById("editor-motion-name");
  this.motionElement = document.getElementById("editor-text");

  eventPublisher.subscribe("mode", (mode) => {
    if (mode === "playing") {
      this.close();
    }
  });

  Editor.instance = this;
  return this;
}

Editor.prototype.open = function(blockId) {
  if (this.openingMotionId === -1) {
    this._animate(true);
  }
  this.openingMotionId = blockId;

  if (this.motionManager.contains(this.openingMotionId)) {
    var motion = this.motionManager.get(this.openingMotionId);
    this.motionNameElement.value = motion.motionName;
    this.motionElement.value = motion.motion;
  } else {
    this.motionNameElement.value = "";
    this.motionElement.value = "";
  }
};

Editor.prototype.close = function() {
  if (this.openingMotionId >= 0) {
    this._animate(false);
    this.openingMotionId = -1;
  }
};

Editor.prototype._animate = function(isOpen) {
  const direction = isOpen ? "alternate" : "alternate-reverse";
  this.editorContainer.animate([{ width: "0"}, { width: "50vw" }], {
    direction: direction, duration: 250, fill: "both", easing: "ease"
  });
};

Editor.prototype.save = function() {
  eventPublisher.publish("saveMotion", {
    motionId: this.openingMotionId,
    motionName: this.motionNameElement.value,
    motion: this.motionElement.value
  });
};

export default Editor;

