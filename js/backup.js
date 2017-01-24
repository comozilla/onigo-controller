import eventPublisher from "./publisher";
import blockManagerModel from "./block-manager-model";

export default class Backup {
  constructor() {
    this.userName = localStorage.getItem("controller-name");

    eventPublisher.subscribe("updateMotion", (index, motion) => {
      const backup = this.contains(this.userName, index) ? this.get(this.userName, index) : this.getEmptyData();
      backup.code = motion;
      this.set(this.userName, index, backup);
    });
    eventPublisher.subscribe("changeBlockName", (index, blockName) => {
      const backup = this.contains(this.userName, index) ? this.get(this.userName, index) : this.getEmptyData();
      backup.blockName = blockName;
      this.set(this.userName, index, backup);
    });
    eventPublisher.subscribe("changeUserName", name => {
      this.addUserNames(this.userName);
      const oldUserName = this.userName;
      this.userName = name;
      this.addUserNames(this.userName);
      this.restore();
      this.setEmptyBlock(oldUserName);
    });
  }
  getUserNames() {
    return JSON.parse(localStorage.getItem("backup-user-names") || "[]");
  }
  getIndexes(name) {
    return JSON.parse(localStorage.getItem(`${name}-backup-index`) || "[]");
  }
  contains(name, index) {
    return this.getIndexes(name).indexOf(index) >= 0;
  }
  getEmptyData() {
    return { code: "", blockName: "" };
  }
  setEmptyBlock(name) {
    const indexes = this.getIndexes(name);
    indexes.forEach(index => {
      blockManagerModel.getBlock(index)
        .save(this.getEmptyData().blockName, this.getEmptyData().code);
    });
  }
  restore() {
    const indexes = this.getIndexes(this.userName);
    indexes.forEach(index => {
      const backup = this.get(this.userName, index);
      blockManagerModel.getBlock(index)
        .save(backup.blockName, backup.code);
    });
  }
  get(name, index) {
    if (!this.contains(name, index)) {
      throw new Error("getしようとしましたが、backupは存在しません。");
    }
    return JSON.parse(localStorage.getItem(`${name}-backup-${index}`));
  }
  addUserNames(name) {
    const userNames = this.getUserNames();
    if (userNames.indexOf(name) === -1) {
      userNames.push(name);
    }
    localStorage.setItem("backup-user-names", JSON.stringify(userNames));
  }
  addIndex(name, index) {
    const indexes = this.getIndexes(name);
    if (indexes.indexOf(index) === -1) {
      indexes.push(index);
    }
    localStorage.setItem(`${name}-backup-index`, JSON.stringify(indexes));
  }
  set(name, index, motion) {
    if (!this.contains(name, index)) {
      this.addIndex(name, index);
    }
    localStorage.setItem(`${name}-backup-${index}`, JSON.stringify(motion));
  }
  clearBackup() {
    const userNames = this.getUserNames();
    userNames.forEach(name => {
      const indexes = this.getIndexes(name);
      indexes.forEach(index => {
        localStorage.removeItem(`${name}-backup-${index}`)
      });
      localStorage.removeItem(`${name}-backup-index`);
    });
    localStorage.removeItem("backup-user-names");
  }
}

