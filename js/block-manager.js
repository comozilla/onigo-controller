import Block from "./block";

function BlockManager() {
  if (typeof BlockManager.instance === "object") {
    return BlockManager.instance;
  }

  this.blocks = [];
  for (var i = 0; i < 9; i++) {
    var blockElement = document.querySelector(`[data-block-index="${i}"]`);
    this.blocks.push(new Block(blockElement));
  }

  BlockManager.instance = this;
  return this;
}

export default BlockManager;

