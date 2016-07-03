function Editor() {
  if (typeof Editor.instance === "object") {
    return Editor.instance;
  }

  this.isOpen = false;

  this.editorContainer = document.getElementById("editor");
  this.editorCloseButton = document.getElementById("editor-close-button");
  this.editorCloseButton.addEventListener("click", () => {
    this.close();
  });

  Editor.instance = this;
  return this;
}

Editor.prototype.open = function() {
  if (!this.isOpen) {
    this._animate(true);
    this.isOpen = true;
  }
};

Editor.prototype.close = function() {
  if (this.isOpen) {
    this._animate(false);
    this.isOpen = false;
  }
};

Editor.prototype._animate = function(isOpen) {
  const direction = isOpen ? "alternate" : "alternate-reverse";
  this.editorContainer.animate([{ width: "0"}, { width: "50vw" }], {
    direction: direction, duration: 250, fill: "both", easing: "ease"
  });
}

export default Editor;

