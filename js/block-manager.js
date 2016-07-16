import Block from "./block";
import eventPublisher from "./publisher";

function BlockManager(editor) {
  if (typeof BlockManager.instance === "object") {
    return BlockManager.instance;
  }
  const builtInBlockCommands = ["rotate", "stop", "dash"];

  this.editor = editor;

  this.blocks = [];
  const blockElements = document.querySelectorAll("[data-block-index]");
  Array.prototype.forEach.call(blockElements, (block, i) => {
    if (i < builtInBlockCommands.length) {
      this.blocks.push(new Block(i, block, this, builtInBlockCommands[i]));
    } else {
      this.blocks.push(new Block(i, block, this));
    }
  });

  eventPublisher.subscribe("availableCommandsCount", count => {
    // 0-2番のblockはbuilt-in-command-button
    for (let i = builtInBlockCommands.length; i < blockElements.length; i++) {
      this.blocks[i].setEnable(i < builtInBlockCommands.length + count);
    }
  });

  BlockManager.instance = this;
  return this;
}

export default BlockManager;

