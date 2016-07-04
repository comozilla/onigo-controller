import eventPublisher from "./publisher";
import mode from "./mode";

function Block(blockId, element, isBuiltIn, blockManager) {
  this.blockId = blockId;
  this.element = element;
  this.isBuiltIn = typeof isBuiltIn === "boolean" && isBuiltIn;
  this.enable = true;
  this.blockManager = blockManager;
  this.mode = mode.making;
  this.blockName = "NEW!";

  if (this.isBuiltIn) {
    this.element.classList.add("built-in-command-button");
  }

  this.element.addEventListener("click", () => {
    if (this.mode === mode.making && !this.isBuiltIn) {
      this.blockManager.editor.open(this.blockId);
    } else if (this.mode === mode.playing) {
      // todo
    }
  });

  eventPublisher.subscribe("mode", (newMode) => {
    this.mode = newMode;
    if (newMode === mode.making) {
      this.element.classList.remove("playing-mode-button");
    } else if (newMode === mode.playing) {
      this.element.classList.add("playing-mode-button");
    }
  });

  eventPublisher.subscribe("saveMotion", (motion) => {
    if (motion.motionId === this.blockId) {
      this.blockName = motion.motionName;
      this.showBlockName();
    }
  });
}

Block.prototype.setEnable = function(enable) {
  this.enable = enable;
  this.element.disabled = !this.enable;
  this.showBlockName();
};

Block.prototype.showBlockName = function() {
  if (!this.isBuiltIn && this.enable) {
    this.element.textContent = this.blockName;
  }
};

export default Block;

