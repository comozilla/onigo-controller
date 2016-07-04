import eventPublisher from "./publisher";

function HPBoard(element) {
  this.element = element;
  this.hp = 0;
  eventPublisher.subscribe("hp", (hp) => {
    this.hp = hp;
    this.updateHP();
  });
  eventPublisher.publish("hp", 100);
}

HPBoard.prototype.updateHP = function() {
  this.element.textContent = this.hp.toString();
};

export default HPBoard;

