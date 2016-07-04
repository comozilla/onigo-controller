import Block from "./block";
import eventPublisher from "./publisher";

function BlockManager(editor) {
  if (typeof BlockManager.instance === "object") {
    return BlockManager.instance;
  }
  const builtInBlockCount = 3;

  this.editor = editor;

  this.blocks = [];
  let blockElements = document.querySelectorAll("[data-block-index]");
  Array.prototype.forEach.call(blockElements, (block, i) => {
    this.blocks.push(new Block(i, block, i < builtInBlockCount, this));
  });

  eventPublisher.subscribe("availableCommandsCount", (count) => {
    // 0-2番のblockはbuilt-in-command-button
    for (let i = builtInBlockCount; i < blockElements.length; i++) {
      this.blocks[i].setEnable(i < builtInBlockCount + count);
    }
  });

  BlockManager.instance = this;
  return this;
}

export default BlockManager;

