import BlockModel from "./block-model";
import BuiltInBlockModel from "./built-in-block-model";
import eventPublisher from "./publisher";
import Command from "./command";

const builtInBlocks = [
  new BuiltInBlockModel("rotate", "回転", new Command("rotate", [45], -1)),
  new BuiltInBlockModel("stop", "停止", new Command("stop", [], -1)),
  new BuiltInBlockModel("dash", "加速", new Command("dash", [50, 1], -1))
];

const builtInBlockCount = 3;
const blockCount = 6;

class BlockManagerModel {
  constructor() {
    this.blocks = [];
    for (let i = 0; i < blockCount; i++) {
      this.blocks.push(new BlockModel(i + builtInBlockCount));
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
    if (index >= 0 && index < builtInBlocks.length) {
      return builtInBlocks[index];
    }
    throw new Error(`BuiltInBlock was not found. index: ${index}`);
  }
  clearBlocks() {
    this.blocks.forEach(block => {
      block.blockName = "NEW!";
      block.motion = "";
      block.sequence = null;
    });
  }
}

export default new BlockManagerModel();
