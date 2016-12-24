import parser from "./parser";

export default class Blocks {
  constructor() {
    this.blocks = [];
    this.currentParseResult = null;
  }
  getEmptyBlock() {
    return {
      name: "NaN",
      motion: "",
      sequence: []
    };
  }
  contains(index) {
    return typeof this.blocks[index] !== "undefined";
  }
  setName(index, name) {
    if (!this.contains(index)) {
      this.blocks[index] = this.getEmptyBlock();
    }
    this.blocks[index].name = name;
  }
  setMotionAndCompile(index, motion) {
    var parseResult = parser.parse(motion);
    this.currentParseResult = parseResult;
    if (parseResult.type === "error") {
      return parseResult;
    }
    if (!this.contains(index)) {
      this.blocks[index] = this.getEmptyBlock();
    }
    this.blocks[index].motion = motion;
    this.blocks[index].sequence = parseResult.commands;
    return parseResult;
  }
  get(index) {
    if (!this.contains(index)) {
      throw new Error(`Tryed to get block but block didn't found.`);
    }
    return this.blocks[index];
  }
}
