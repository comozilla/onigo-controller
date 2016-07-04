import eventPublisher from "./publisher";
import mode from "./mode";

function ModeManager() {
  if (typeof ModeManager.instance === "object") {
    return ModeManager.instance;
  }

  this.switchModeButton = document.getElementById("switch-mode-button");
  this.banners = new Map([
    [mode.making, document.getElementById("making-mode-banner")],
    [mode.playing, document.getElementById("playing-mode-banner")]
  ]);

  eventPublisher.subscribe("mode", (newMode) => {
    this.mode = newMode;
    for (let [bannerName, bannerElement]of this.banners) {
      if (bannerName === this.mode) {
        bannerElement.classList.add("active-banner");
      } else {
        bannerElement.classList.remove("active-banner");
      }
    }
  });
  eventPublisher.publish("mode", mode.making);

  this.switchModeButton.addEventListener("click", () => {
    const modeNames = [...this.banners.keys()];
    const modeIndex = modeNames.indexOf(this.mode);
    const nextModeIndex = modeIndex + 1 >= modeNames.length ?
      0 : modeIndex + 1;
    eventPublisher.publish("mode", modeNames[nextModeIndex]);
  });

  ModeManager.instance = this;
  return this;
}

export default ModeManager;

