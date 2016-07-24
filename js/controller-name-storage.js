function ControllerNameStorage() {
}

ControllerNameStorage.prototype.has = function() {
  return localStorage.getItem("controller-name") !== null;
};

ControllerNameStorage.prototype.set = function(name) {
  return localStorage.setItem("controller-name", name);
};

ControllerNameStorage.prototype.get = function() {
  if (!this.has()) {
    throw new Error("localStorageにcontroller-nameは保存されていません。");
  }
  return localStorage.getItem("controller-name");
}

export default ControllerNameStorage;
