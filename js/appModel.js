import Blocks from "./blocks";

var appModel = {
  states: {
    builtInBlocks: {
      rotate: "回転",
      stop: "停止",
      dash: "加速"
    },
    blocks: new Blocks(),
    editingBlockIndex: -1,
  },
  changeCaption: function() {
    appModel.states.builtInBlocks.rotate = "ほげ";
  },
  openEditor: function(index) {
    appModel.states.editingBlockIndex = index;
  },
  closeEditor: function() {
    appModel.states.editingBlockIndex = -1;
  }
};

module.exports = appModel;
