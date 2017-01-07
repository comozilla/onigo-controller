var appModel = {
  states: {
    builtInBlocks: {
      rotate: "回転",
      stop: "停止",
      dash: "加速"
    },
    editingBlockIndex: -1,
  },
  changeCaption() {
    appModel.states.builtInBlocks.rotate = "ほげ";
  },
  openEditor(index) {
    appModel.states.editingBlockIndex = index;
  },
  closeEditor() {
    appModel.states.editingBlockIndex = -1;
  }
};

module.exports = appModel;
