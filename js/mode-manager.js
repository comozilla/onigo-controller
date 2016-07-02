import eventPublisher from "./publisher";

function ModeManager() {
  if (typeof ModeManager.instance === "object") {
    return ModeManager.instance;
  }

  this.switchModeButton = document.getElementById("switch-mode-button");
  this.banners = {
    making: document.getElementById("making-mode-banner"),
    playing: document.getElementById("playing-mode-banner")
  };

  eventPublisher.subscribe("mode", (mode) => {
    this.mode = mode;
    Object.keys(this.banners).forEach(bannerName => {
      if (bannerName === this.mode) {
        this.banners[bannerName].classList.add("active-banner");
      } else {
        this.banners[bannerName].classList.remove("active-banner");
      }
    });
  });
  eventPublisher.publish("mode", "making");

  this.switchModeButton.addEventListener("click", () => {
    var modeNames = Object.keys(this.banners);
    var modeIndex = modeNames.indexOf(this.mode);
    var nextModeIndex = modeIndex + 1 >= modeNames.length ?
      0 : modeIndex + 1;
    eventPublisher.publish("mode", modeNames[nextModeIndex]);
  });

  ModeManager.instance = this;
  return this;
}

export default ModeManager;

