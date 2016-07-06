import eventPublisher from "./publisher";

function GameStatusLabel(element) {
  this.element = element;
  eventPublisher.subscribe("gameState", (gameState) => {
    if (gameState === "active") {
      this.element.textContent = "ゲーム中";
    } else {
      this.element.textContent = "ゲームは開始されていません！";
    }
  });
}

export default GameStatusLabel;

