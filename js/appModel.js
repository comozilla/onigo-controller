var appModel = {
  states: {
    builtInBlocks: {
      rotate: "回転",
      stop: "停止",
      dash: "加速"
    },
    editingBlockIndex: -1,
  },
  changeCaption: function() {
    appModel.states.builtInBlocks.rotate = "ほげ";
  },
  openEditor: function(index) {
    appModel.states.editingBlockIndex = index;
  }
};

module.exports = appModel;
