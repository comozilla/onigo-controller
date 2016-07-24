import eventPublisher from "./publisher";

function InactiveScreen() {
  this.inactiveScreen = document.getElementById("inactive-screen");
  this.inactiveInner = document.getElementById("inactive-inner");
  eventPublisher.subscribe("ws-connected", () => {
    this.changeStatus("connected");
  });
  eventPublisher.subscribe("ws-error", () => {
    this.changeStatus("error");
  });
  eventPublisher.subscribe("ws-not-found", () => {
    this.changeStatus("not-found");
  });
  eventPublisher.subscribe("acceptName", () => {
    this.changeStatus("named");
  });
  this.changeStatus("connecting");
}

InactiveScreen.prototype.changeStatus = function(screenState) {
  if (screenState === "named") {
    this.inactiveScreen.classList.remove("screen-active");
    return;
  }
  this.inactiveScreen.classList.add("screen-active");
  switch (screenState) {
    case "connecting":
      this.inactiveInner.textContent = "サーバーに接続しています...";
      break;
    case "not-found":
      this.inactiveInner.textContent = "サーバーが見つかりませんでした";
      break;
    case "error":
      this.inactiveInner.textContent = "通信でエラーが発生しました";
      break;
    case "active":
      this.inactiveInner.textContent = "接続しました。ControllerNameを決めています...";
      break;
    // ESLintで↓がないとおこられる
    default:
      break;
  }
};

export default InactiveScreen;
