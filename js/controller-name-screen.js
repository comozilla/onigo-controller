import eventPublisher from "./publisher";
import ControllerNameStorage from "./controller-name-storage";

function ControllerNameScreen(spheroClient) {
  this.screenElement = document.getElementById("controller-name-screen");
  this.submitButton = document.getElementById("submit-controller-name");
  this.pickElement = document.getElementById("controller-name");
  this.storage = new ControllerNameStorage();
  this.submitButton.disabled = false;
  eventPublisher.subscribe("ws-connected", () => {
    eventPublisher.subscribe("acceptName", name => {
      this.storage.set(name);
    });
    eventPublisher.subscribe("rejectName", () => {
      this.screenElement.classList.add("screen-active");
      this.submitButton.disabled = false;
      this.submitButton.textContent = "決定";
      this.pickElement.value = "";
    });
    this.submitButton.addEventListener("click", () => {
      spheroClient.requestName(this.pickElement.value);
      this.submitButton.disabled = true;
      this.screenElement.classList.remove("screen-active");
      this.submitButton.textContent = "サーバーの応答を待っています";
    });
    if (this.storage.has()) {
      spheroClient.useDefinedName(this.storage.get());
    } else {
      this.screenElement.classList.add("screen-active");
    }
  });
}

export default ControllerNameScreen;
