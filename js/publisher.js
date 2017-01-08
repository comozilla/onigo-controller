// Publisherは、データを保存せず、外部へ変更を知らせる機能に絞る。

class Publisher {
  constructor() {
    this.modelObservers = {};
    this.observers = {};
  }
  subscribe(type, observer) {
    if (typeof this.observers[type] === "undefined") {
      this.observers[type] = [];
    }
    this.observers[type].push(observer);
  }
  subscribeModel(type, observer) {
    if (typeof this.modelObservers[type] === "undefined") {
      this.modelObservers[type] = [];
    }
    this.modelObservers[type].push(observer);
  }
  publish(type, nextData) {
    if (type.indexOf(":") !== -1) {
      throw new Error("publishのtypeに「:」を含むことはできません。");
    }
    if (typeof this.observers[type] === "undefined") {
      this.observers[type] = [];
    }
    if (typeof this.modelObservers[type] === "undefined") {
      this.modelObservers[type] = [];
    }
    this.modelObservers[type].forEach(observer => {
      observer(nextData);
    });
    this.observers[type].forEach(observer => {
      observer(nextData);
    });
    if (typeof this.observers[type + ":after"] !== "undefined") {
      this.observers[type + ":after"].forEach(observer => {
        observer(nextData);
      });
    }
  }
}

export default new Publisher();

