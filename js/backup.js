import eventPublisher from "./publisher";
import blockManagerModel from "./block-manager-model";

export default class Backup {
  constructor() {
    this.motions = {};
    eventPublisher.subscribe("updateMotion", (index, motion) => {
      if (!this.contains(index)) {
        this.makeEmptyData(index);
      }
      this.motions[index].code = motion;
      this.save();
    });
    eventPublisher.subscribe("changeBlockName", (index, blockName) => {
      if (!this.contains(index)) {
        this.makeEmptyData(index);
      }
      this.motions[index].blockName = blockName;
      this.save();
    });
  }
  contains(index) {
    return typeof this.motions[index] !== "undefined";
  }
  makeEmptyData(index) {
    this.motions[index] = { code: "", blockName: "" };
  }
  restore() {
    if (!this.has()) {
      throw new Error("restoreしようとしましたが、backupは存在しません");
    }
    const backup = JSON.parse(localStorage.getItem("backup"));
    Object.keys(backup).forEach(index => {
      blockManagerModel.getBlock(index).save(backup[index].blockName, backup[index].code);
    });
  }
  has() {
    return localStorage.getItem("backup") !== null;
  }
  save() {
    localStorage.setItem("backup", JSON.stringify(this.motions));
  }
  clear() {
    localStorage.removeItem("backup");
  }
}

