function Editor() {
  if (typeof Editor.instance === "object") {
    return Editor.instance;
  }

  this.editorContainer = document.getElementById("editor");
  this.editorCloseButton = document.getElementById("editor-close-button");
  this.editorCloseButton.addEventListener("click", () => {
    this.close();
  });

  Editor.instance = this;
  return this;
}

Editor.prototype.open = function() {
  // todo: web animations を使う
  this.editorContainer.classList.add("active-editor");
};

Editor.prototype.close = function() {
  // todo: web animations を使う
  this.editorContainer.classList.remove("active-editor");
};

export default Editor;

