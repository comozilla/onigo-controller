import eventPublisher from "./publisher";
import Motion from "./motion";

import ace from "brace";
import "brace/mode/javascript";
import "brace/theme/twilight";
import mode from "./mode";

function Editor() {
  if (typeof Editor.instance === "object") {
    return Editor.instance;
  }

  this.editor = ace.edit("editor-text");
  this.editor.setTheme("ace/theme/twilight");
  this.editor.setShowInvisibles(true);
  const session = this.editor.getSession();
  session.setMode("ace/mode/javascript");
  session.setTabSize(2);
  session.setUseSoftTabs(true);

  this.openingMotionId = 0;

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

  eventPublisher.subscribe("mode", (newMode) => {
    if (newMode === mode.playing) {
      this.close();
    }
  });
  this.close();

  Editor.instance = this;
  return this;
}

Editor.prototype.open = function(blockId, motion) {
  if (this.openingMotionId === -1) {
    this.animate(true);
  }
  this.openingMotionId = blockId;

  const currentEditingBlock = document.querySelector(".editing-block");
  if (currentEditingBlock !== null) {
    currentEditingBlock.classList.remove("editing-block");
  }
  document.querySelector(`[data-block-index="${this.openingMotionId}"]`)
    .classList.add("editing-block");
  if (motion !== null) {
    this.motionNameElement.value = motion.motionName;
    this.editor.setValue(motion.motionCode, 0);
  } else {
    this.motionNameElement.value = "";
    this.editor.setValue("", 0);
  }
};

Editor.prototype.close = function() {
  if (this.openingMotionId >= 0) {
    this.animate(false);
    this.openingMotionId = -1;
  }
};

Editor.prototype.animate = function(isOpen) {
  const direction = isOpen ? "alternate" : "alternate-reverse";
  this.editorContainer.animate([{ width: "0" }, { width: "50vw" }], {
    direction: direction, duration: 250, fill: "both", easing: "ease"
  });
};

Editor.prototype.save = function() {
  eventPublisher.publish("saveMotion", {
    motionId: this.openingMotionId,
    motion: new Motion(
      this.motionNameElement.value === "" ?
        "無名のモーション" : this.motionNameElement.value,
      this.editor.getValue())
  });
};

export default Editor;

