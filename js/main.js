import CalibrationButton from "./calibration-button";
import HPBoard from "./hp-board";
import InactiveStatus from "./inactive-status";
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

document.addEventListener("DOMContentLoaded", function() {
  const motionManager = new MotionManager();
  const editor = new Editor(motionManager);
  new InactiveStatus();
  new SpheroStates();
  new SpheroClient("ws://localhost:8080");
  new HPBoard(document.getElementById("hp"));
  new CalibrationButton(document.getElementById("calibration-button"));
  new ModeManager();
  new BlockManager(editor);
});
