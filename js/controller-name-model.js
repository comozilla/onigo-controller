import eventPublisher from "./publisher";
import spheroClient from "./sphero-client";

class ControllerNameModel {
  constructor() {
    this.currentResolveCallback = null;
    this.currentRejectCallback = null;
    this.isNeedNewName = false;
    eventPublisher.subscribeModel("isNeedNewName", isNeed => {
      this.isNeedNewName = isNeed;
    });
    eventPublisher.subscribeModel("acceptName", name => {
      if (typeof this.currentResolveCallback === "function") {
        this.currentResolveCallback();
        this.currentResolveCallback = null;
      }
      this.setName(name);
      this.changeIsNeedNewName(false);
    });
    eventPublisher.subscribeModel("rejectName", name => {
      if (typeof this.currentRejectCallback === "function") {
        this.currentRejectCallback();
        this.currentRejectCallback = null;
      }
      this.changeIsNeedNewName(true);
    });
    eventPublisher.subscribeModel("ws-connected", () => {
      if (this.hasName(name)) {
        spheroClient.useDefinedName(this.getName());
      } else {
        this.changeIsNeedNewName(true);
      }
    });
  }
  requestName(controllerName) {
    return new Promise((resolve, reject) => {
      this.currentResolveCallback = resolve;
      this.currentRejectCallback = reject;
      spheroClient.requestName(controllerName);
    });
  }
  changeIsNeedNewName(isNeed) {
    if (this.isNeedNewName !== isNeed) {
      eventPublisher.publish("isNeedNewName", isNeed);
    }
  }
  hasName() {
    return localStorage.getItem("controller-name") !== null;
  }
  setName(name) {
    localStorage.setItem("controller-name", name);
  }
  getName() {
    if (!this.hasName()) {
      throw new Error("localStorageにcontroller-nameは保存されていません。");
    }
    return localStorage.getItem("controller-name");
  }
}

export default new ControllerNameModel();
