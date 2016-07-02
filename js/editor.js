function Editor() {
  if (typeof Editor.instance === "object") {
    return Editor.instance;
  }

  this.editorContainer = document.getElementById("editor");

  Editor.instance = this;
  return this;
}

Editor.prototype.open = function() {
  // todo: web animations を使う
  this.editorContainer.classList.add("active-editor");
};

export default Editor;

