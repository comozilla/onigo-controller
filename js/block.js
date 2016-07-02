import eventPublisher from "./publisher";

function Block(element, isBuiltIn, editor) {
  this.element = element;
  this.isBuiltIn = typeof isBuiltIn === "boolean" && isBuiltIn;
  this.enable = true;
  this.editor = editor;

  if (this.isBuiltIn) {
    this.element.classList.add("built-in-command-button");
  }

  if (!this.isBuiltIn) {
    this.element.addEventListener("click", () => {
      editor.open();
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

