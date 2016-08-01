import eventPublisher from "./publisher";

function ColorBoard(element) {
  this.element = element;
  eventPublisher.subscribe("color", color => {
    this.element.style.backgroundColor = color;
    this.element.textContent = color;
  });
}

export default ColorBoard;

