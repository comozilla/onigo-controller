import eventPublisher from "./publisher";
import blockManagerModel from "./block-manager-model";

export default class Backup {
  constructor() {
    eventPublisher.subscribe("updateMotion", (index, motion) => {
      const backup = this.contains(index) ? this.get(index) : this.getEmptyData();
      backup.code = motion;
      this.set(index, backup);
    });
    eventPublisher.subscribe("changeBlockName", (index, blockName) => {
      const backup = this.contains(index) ? this.get(index) : this.getEmptyData();
      backup.blockName = blockName;
      this.set(index, backup);
    });
  }
  getIndexes() {
    return JSON.parse(localStorage.getItem("backup-index") || "[]");
  }
  contains(index) {
    return this.getIndexes().indexOf(index) >= 0;
  }
  getEmptyData() {
    return { code: "", blockName: "" };
  }
  restore() {
    const indexes = this.getIndexes();
    indexes.forEach(index => {
      const backup = this.get(index);
      blockManagerModel.getBlock(index)
        .save(backup.blockName, backup.code);
    });
  }
  get(index) {
    if (!this.contains(index)) {
      throw new Error("getしようとしましたが、backupは存在しません。");
    }
    return JSON.parse(localStorage.getItem(`backup-${index}`));
  }
  addIndex(index) {
    const indexes = this.getIndexes();
    if (indexes.indexOf(index) === -1) {
      indexes.push(index);
    }
    localStorage.setItem("backup-index", JSON.stringify(indexes));
  }
  set(index, motion) {
    if (!this.contains(index)) {
      this.addIndex(index);
    }
    localStorage.setItem(`backup-${index}`, JSON.stringify(motion));
  }
  clearBackup() {
    const indexes = this.getIndexes();
    indexes.forEach(index => {
      localStorage.removeItem(`backup-${index}`);
    });
    localStorage.removeItem("backup-index");
  }
}

