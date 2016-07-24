import eventPublisher from "./publisher";

function ControllerNameScreen() {
  this.screenElement = document.getElementById("controller-name-screen");
  this.submitButton = document.getElementById("submit-controller-name");
  this.pickElement = document.getElementById("controller-name");
  eventPublisher.subscribe("controller-name", () => {
    // controller-name ‚ªŒˆ‚Ü‚Á‚½‚ç‰B‚·
    this.screenElement.classList.remove("screen-active");
  });
  this.submitButton.addEventListener("click", () => {
    eventPublisher.publish("controller-name", this.pickElement.value);
  });
}

export default ControllerNameScreen;
