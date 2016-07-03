import eventPublisher from "./publisher";

function Block(blockId, element, isBuiltIn, blockManager) {
  this.blockId = blockId;
  this.element = element;
  this.isBuiltIn = typeof isBuiltIn === "boolean" && isBuiltIn;
  this.enable = true;
  this.blockManager = blockManager;

  if (this.isBuiltIn) {
    this.element.classList.add("built-in-command-button");
  }

  if (!this.isBuiltIn) {
    this.element.addEventListener("click", () => {
      this.blockManager.editor.open(this.blockId);
    });
  }

  eventPublisher.subscribe("mode", (mode) => {
    if (mode === "making") {
      this.element.classList.remove("playing-mode-button");
    } else if (mode === "playing") {
      this.element.classList.add("playing-mode-button");
    }
  });
}

Block.prototype.setEnable = function(enable) {
  this.enable = enable;
  this.element.disabled = !this.enable;
};

export default Block;

