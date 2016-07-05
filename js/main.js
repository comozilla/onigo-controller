import CalibrationButton from "./calibration-button";
import HPBoard from "./hp-board";
import PlayingStateLabel from "./playing-state-label";
import InactiveScreen from "./inactive-screen";
import SpheroStates from "./sphero-states";
import SpheroClient from "./sphero-client";
import ModeManager from "./mode-manager";
import MotionManager from "./motion-manager";
import BlockManager from "./block-manager";
import Editor from "./editor";

// webpack
import "../css/style.css";
import "font-awesome";
import "web-animations-js";

import ace from "brace";
import "brace/mode/javascript";
import "brace/theme/twilight";

document.addEventListener("DOMContentLoaded", function() {
  const motionManager = new MotionManager();
  const editor = new Editor(motionManager);
  new InactiveScreen();
  new SpheroStates();
  new SpheroClient("ws://localhost:8080");
  new HPBoard(document.getElementById("hp"));
  new PlayingStateLabel(document.getElementById("is-active-game"));
  new CalibrationButton(document.getElementById("calibration-button"));
  new ModeManager();
  new BlockManager(editor);
});
