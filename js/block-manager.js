import Block from "./block";
import eventPublisher from "./publisher";

function BlockManager() {
  if (typeof BlockManager.instance === "object") {
    return BlockManager.instance;
  }

  const blockCount = 9;

  this.blocks = [];
  for (var i = 0; i < blockCount; i++) {
    var blockElement = document.querySelector(`[data-block-index="${i}"]`);
    this.blocks.push(new Block(blockElement));
  }

  eventPublisher.subscribe("availableCommandsCount", (count) => {
    for (var i = 3; i < blockCount; i++) {
      this.blocks[i].setEnable(i < 3 + count);
    }
  });

  BlockManager.instance = this;
  return this;
}

export default BlockManager;

