import eventPublisher from "./publisher";

function HPBoard(element) {
  this.element = element;
  this.hpTextElement = this.element.querySelector("#hp-text");
  this.hpBarElement = this.element.querySelector("#hp-bar-inner");
  this.hp = 0;
  eventPublisher.subscribe("hp", (hp) => {
    this.hp = hp;
    this.updateHP();
  });
  eventPublisher.publish("hp", 100);
}

HPBoard.prototype.updateHP = function() {
  this.hpTextElement.textContent = this.hp.toString();
  this.hpBarElement.style.width = Math.max(0, Math.min(100, this.hp)) + "%";
};

export default HPBoard;

