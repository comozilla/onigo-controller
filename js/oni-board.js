import eventPublisher from "./publisher";

function OniBoard(element) {
  this.element = element;
  eventPublisher.subscribe("oni", enable => {
    if (enable) {
      this.element.src = "images/oni.svg";
    } else {
      this.element.src = "images/light.svg";
    }
  });
}

export default OniBoard;

