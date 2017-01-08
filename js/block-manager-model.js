import Block from "./block";
import eventPublisher from "./publisher";
import Command from "./command";

const builtInCommands = {
  rotate: new Command("rotate", [45], -1),
  stop: new Command("stop", [], -1),
  dash: new Command("dash", [50, 1], -1)
};

const builtInBlockCount = 3;
const blockCount = 6;

class BlockManagerModel {
  constructor() {
    this.builtInBlocks = {
      rotate: { label: "回転", className: "built-in-rotate" },
      stop: { label: "停止", className: "built-in-stop" },
      dash: { label: "加速", className: "built-in-dash" }
    };
    this.blocks = [];
    for (let i = 0; i < blockCount; i++) {
      this.blocks.push(new Block(i + builtInBlockCount));
    }

    eventPublisher.subscribeModel("availableCommandsCount", count => {
      for (let i = 0; i < blockCount; i++) {
        this.blocks[i].setIsEnabled(i < count);
      }
    });
  }
  containsBlock(index) {
    return typeof this.blocks[index - builtInBlockCount] !== "undefined";
  }
  getBlock(index) {
    if (!this.containsBlock(index)) {
      throw new Error(`Block was not found. index: ${index}`);
    }
    return this.blocks[index - builtInBlockCount];
  }
  getBuiltInBlock(index) {
    var builtInBlocksKeys = Object.keys(this.builtInBlocks);
    if (index >= 0 & index < builtInBlocksKeys.length) {
      return this.builtInBlocks[builtInBlocksKeys[index]];
    }
    throw new Error(`BuiltInBlock was not found. index: ${index}`);
  }
}

export default new BlockManagerModel();
