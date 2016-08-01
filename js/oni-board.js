import eventPublisher from "./publisher";

function OniBoard(element) {
  this.element = element;
  eventPublisher.subscribe("oni", isEnable => {
    if (isEnable) {
      this.element.classList.add("oni-enable");
    } else {
      this.element.classList.remove("oni-enable");
    }
  });
}

export default OniBoard;

