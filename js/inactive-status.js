import eventPublisher from "./publisher";

function InactiveStatus() {
  this.inactiveScreen = document.getElementById("inactive-screen");
  this.inactiveInner = document.getElementById("inactive-inner");
  eventPublisher.subscribe("gameState", (gameState) => {
    this.changeStatus(gameState);
  });
  eventPublisher.subscribe("ws-connected", () => {
    this.changeStatus("connected");
  });
  eventPublisher.subscribe("ws-error", () => {
    this.changeStatus("error");
  });
  eventPublisher.subscribe("ws-not-found", () => {
    this.changeStatus("not-found");
  });
}

InactiveStatus.prototype.changeStatus = function(screenState) {
  switch (screenState) {
    case "disconnected":
      this.inactiveInner.textContent = "サーバーに接続されていません";
      break;
    case "not-found":
      this.inactiveInner.textContent = "サーバーが見つかりませんでした";
      break;
    case "error":
      this.inactiveInner.textContent = "通信でエラーが発生しました";
      break;
    case "connected":
      this.inactiveInner.textContent = "サーバーに接続されました。ゲームの状態の受信を待機しています...";
      break;
    case "inactive":
      this.inactiveInner.textContent = "ゲームは開始されていません";
      break;
  }
  if (screenState === "active") this.inactiveScreen.classList.add("screen-game-active");
  else this.inactiveScreen.classList.remove("screen-game-active");
};

export default InactiveStatus;
