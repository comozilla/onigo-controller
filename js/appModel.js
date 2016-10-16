var makerModel = {
  states: {
    builtInBlocks: {
      rotate: "回転",
      stop: "停止",
      dash: "加速"
    },
    isOpeningEditor: false
  },
  changeCaption: function() {
    makerModel.states.builtInBlocks.rotate = "ほげ";
  },
  openEditor: function(index) {
    makerModel.states.isOpeningEditor = true;
  }
};

module.exports = makerModel;
