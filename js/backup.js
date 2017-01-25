import eventPublisher from "./publisher";
import blockManagerModel from "./block-manager-model";

export default class Backup {
  constructor() {
    this.userName = localStorage.getItem("controller-name");
    this.addUserNames(this.userName);

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
    eventPublisher.subscribeModel("userName", name => {
      this.userName = name;
      this.addUserNames(this.userName);
      blockManagerModel.clearBlocks();
      this.restore();
    });
  }
  getUserNames() {
    return JSON.parse(localStorage.getItem("backup-user-names") || "[]");
  }
  getIndexes(name) {
    return JSON.parse(localStorage.getItem(`${name}-backup-index`) || "[]");
  }
  contains(index) {
    return this.getIndexes(this.userName).indexOf(index) >= 0;
  }
  getEmptyData() {
    return { code: "", blockName: "" };
  }
  restore() {
    const indexes = this.getIndexes(this.userName);
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
    return JSON.parse(localStorage.getItem(`${this.userName}-backup-${index}`));
  }
  addUserNames(name) {
    const userNames = this.getUserNames();
    if (userNames.indexOf(name) === -1) {
      userNames.push(name);
    }
    localStorage.setItem("backup-user-names", JSON.stringify(userNames));
  }
  addIndex(index) {
    const indexes = this.getIndexes(this.userName);
    if (indexes.indexOf(index) === -1) {
      indexes.push(index);
    }
    localStorage.setItem(`${this.userName}-backup-index`, JSON.stringify(indexes));
  }
  set(index, motion) {
    if (!this.contains(index)) {
      this.addIndex(index);
    }
    localStorage.setItem(`${this.userName}-backup-${index}`, JSON.stringify(motion));
  }
  clearBackup() {
    const userNames = this.getUserNames();
    userNames.forEach(name => {
      let indexes = this.getIndexes(name);
      indexes.forEach(index => {
        localStorage.removeItem(`${name}-backup-${index}`);
      });
      localStorage.removeItem(`${name}-backup-index`);
    });
    localStorage.removeItem("backup-user-names");
  }
}

