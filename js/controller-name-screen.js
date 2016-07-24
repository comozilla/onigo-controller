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
      // controller-name が許可されたら隠す
      this.screenElement.classList.remove("screen-active");
      this.storage.set(name);
    });
    eventPublisher.subscribe("rejectName", () => {
      this.submitButton.disabled = false;
      this.submitButton.textContent = "決定";
      this.pickElement.value = "";
      this.pickElement.placeholder = "別の名前をここに入力しよう";
    });
    eventPublisher.subscribe("rejectDefinedName", () => {
      this.screenElement.classList.add("screen-active");
    });
    this.submitButton.addEventListener("click", () => {
      spheroClient.requestName(this.pickElement.value);
      this.submitButton.disabled = true;
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
