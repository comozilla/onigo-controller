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
  let inactiveStatus = new InactiveStatus();
  let spheroStates = new SpheroStates();
  let spheroClient = new SpheroClient("ws://localhost:8080");
  let hpBoard = new HPBoard(document.getElementById("hp"));
  let calibrationButton =
    new CalibrationButton(document.getElementById("calibration-button"));
  let modeManager = new ModeManager();
  let motionManager = new MotionManager();
  let editor = new Editor(motionManager);
  let blockManager = new BlockManager(editor);
});
