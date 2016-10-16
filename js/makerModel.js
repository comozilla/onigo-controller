var makerModel = {
  states: {
    builtInBlocks: {
      rotate: "回転",
      stop: "停止",
      dash: "加速"
    }
  },
  changeCaption: function() {
    makerModel.states.builtInBlocks.rotate = "ほげ";
  }
};

module.exports = makerModel;
