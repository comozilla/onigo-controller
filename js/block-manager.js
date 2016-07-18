import Block from "./block";
import eventPublisher from "./publisher";

function BlockManager(editor) {
  if (typeof BlockManager.instance === "object") {
    return BlockManager.instance;
  }
  const builtInBlockCommands = [{
    name: "rotate",
    image: "images/turn.svg"
  }, {
    name: "stop",
    image: "images/stop.svg"
  }, {
    name: "dash",
    image: "images/dash.svg"
  }];

  this.editor = editor;

  this.blocks = [];
  const blockElements = document.querySelectorAll("[data-block-index]");
  Array.prototype.forEach.call(blockElements, (block, i) => {
    if (i < builtInBlockCommands.length) {
      block.style.backgroundImage = `url(${builtInBlockCommands[i].image})`;
      this.blocks.push(new Block(i, block, this, builtInBlockCommands[i].name));
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

