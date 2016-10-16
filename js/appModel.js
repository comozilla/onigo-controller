var appModel = {
  states: {
    builtInBlocks: {
      rotate: "回転",
      stop: "停止",
      dash: "加速"
    },
    isOpeningEditor: false
  },
  changeCaption: function() {
    appModel.states.builtInBlocks.rotate = "ほげ";
  },
  openEditor: function(index) {
    appModel.states.isOpeningEditor = true;
  }
};

module.exports = appModel;
