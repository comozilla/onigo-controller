import eventPublisher from "./publisher";

function Block(element) {
  this.element = element;
  this.enable = true;

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

