import eventPublisher from "./publisher";
import mode from "./mode";
import Command from "./command";
import parser from "./parser";
import appModel from "./app-model";

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
    this.motion = "";
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

    eventPublisher.subscribeModel("updateMotion", (index, motion) => {
      if (this.index === index) {
        this.motion = motion;
      }
    });

    eventPublisher.subscribeModel("updateSequence", (index, sequence) => {
      if (this.index === index) {
        this.sequence = sequence;
      }
    });
  }
  setIsEnabled(isEnabled) {
    if (this.isEnabled !== isEnabled) {
      eventPublisher.publish("changeIsEnabled", this.index, isEnabled);
    }
  }
  save(blockName, motion) {
    if (this.blockName !== blockName) {
      eventPublisher.publish("changeBlockName", this.index, blockName);
    }
    if (this.motion !== motion) {
      const parseResult = parser.parse(motion);
      if (parseResult.type === "error") {
        parseResult.errors.map(message => {
          return { type: "error", message };
        });
        appModel.changeCurrentLogs(parseResult.errors.map(message => {
          return { type: "error", message };
        }));
      } else if (parseResult.type === "success") {
        eventPublisher.publish("updateMotion", this.index, motion);
        eventPublisher.publish("updateSequence", this.index,
                               parseResult.commands);
        appModel.changeCurrentLogs([{
          type: "success",
          message: "コードのParseは正しく完了しました。"
        }]);
      }
    }
  }
}
