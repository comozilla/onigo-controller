import eventPublisher from "./publisher";
import mode from "./mode";
import Command from "./command";

const customSymbol = Symbol("custom");
const classes = new Map([
  ["NEW!", "block-new"],
  ["ジグザグ", "block-zigzag"],
  ["光る", "block-light"],
  [customSymbol, "block-custom"]
]);

export default class Block {
  constructor(index) {
    this.isEnabled = true;
    this.blockName = "NEW!";
    this.motion = null;
    this.sequence = null;
    this.index = index;

    eventPublisher.subscribeModel("changeIsEnabled", (index, isEnabled) => {
      if (this.index === index) {
        this.isEnabled = isEnabled;
      }
    });

    eventPublisher.subscribeModel("changeBlockName", (index, blockName) => {
      if (this.index === index) {
        this.blockName = blockName;
      }
    });
  }
  setIsEnabled(isEnabled) {
    if (this.isEnabled !== isEnabled) {
      eventPublisher.publish("changeIsEnabled", this.index, isEnabled);
    }
  }
  changeBlockName(blockName) {
    if (this.blockName !== blockName) {
      eventPublisher.publish("changeBlockName", this.index, blockName);
    }
  }
}

