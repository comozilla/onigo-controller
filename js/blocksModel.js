import parser from "./parser";

var blocksModel = {
  states: {
    blocks: [],
    currentParseResult: null
  },
  getEmptyBlock() {
    return {
      name: "NaN",
      motion: "",
      sequence: []
    };
  },
  contains(index) {
    return typeof this.states.blocks[index] !== "undefined";
  },
  setName(index, name) {
    if (!this.contains(index)) {
      this.states.blocks[index] = this.getEmptyBlock();
    }
    console.log(this.states.blocks[index]);
    this.states.blocks[index].name = name;
  },
  setMotionAndCompile(index, motion) {
    var parseResult = parser.parse(motion);
    this.currentParseResult = parseResult;
    if (parseResult.type === "error") {
      return parseResult;
    }
    if (!this.contains(index)) {
      this.states.blocks[index] = this.getEmptyBlock();
    }
    this.states.blocks[index].motion = motion;
    this.states.blocks[index].sequence = parseResult.commands;
    return parseResult;
  },
  get(index) {
    if (!this.contains(index)) {
      throw new Error(`Tryed to get block but block didn't found.`);
    }
    return this.states.blocks[index];
  }
};

window.blocksModel = blocksModel;

module.exports = blocksModel;

