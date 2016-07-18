import Block from "./block";
import eventPublisher from "./publisher";

function BlockManager(editor) {
  if (typeof BlockManager.instance === "object") {
    return BlockManager.instance;
  }
  this.editor = editor;

  this.blocks = [];
  const blockElements = document.querySelectorAll("[data-block-index]");
  Array.prototype.forEach.call(blockElements, (block, i) => {
    if (/^built-in-+/.test(block.id)) {
      this.blocks.push(new Block(i, block, this, block.id.replace(/built-in-/, "")));
    } else {
      this.blocks.push(new Block(i, block, this));
    }
  });

  eventPublisher.subscribe("availableCommandsCount", count => {
    // 0-2番のblockはbuilt-in-command-button
    for (let i = 0, builtInBlockCount = 0; i < blockElements.length; i++) {
      if (this.blocks[i].builtInCommandName === null) {
        this.blocks[i].setEnable(i < count + builtInBlockCount);
      } else {
        builtInBlockCount++;
      }
    }
  });

  BlockManager.instance = this;
  return this;
}

export default BlockManager;

