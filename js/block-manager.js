import Block from "./block";
import eventPublisher from "./publisher";

function BlockManager(editor) {
  if (typeof BlockManager.instance === "object") {
    return BlockManager.instance;
  }
  const blockCount = 9;
  const builtInBlockCount = 3;

  this.editor = editor;

  this.blocks = [];
  for (let i = 0; i < blockCount; i++) {
    const blockElement = document.querySelector(`[data-block-index="${i}"]`);
    this.blocks.push(new Block(i, blockElement, i < 3, this));
  }

  eventPublisher.subscribe("availableCommandsCount", (count) => {
    // 0-2番のblockはbuilt-in-command-button
    for (let i = builtInBlockCount; i < blockCount; i++) {
      this.blocks[i].setEnable(i < BlockManager + count);
    }
  });

  BlockManager.instance = this;
  return this;
}

export default BlockManager;

