import eventPublisher from "./publisher";

function Block(element, isBuiltIn) {
  this.element = element;
  this.isBuiltIn = typeof isBuiltIn === "boolean" && isBuiltIn;
  this.enable = true;

  if (this.isBuiltIn) {
    this.element.classList.add("built-in-command-button");
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

