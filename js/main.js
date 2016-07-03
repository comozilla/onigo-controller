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

let spheroStates;
let spheroClient;
let calibrationButton;
let hpBoard;
let inactiveStatus;
let modeManager;
let motionManager;
let blockManager;
let editor;

document.addEventListener("DOMContentLoaded", function() {
  inactiveStatus = new InactiveStatus();
  spheroStates = new SpheroStates();
  spheroClient = new SpheroClient("ws://localhost:8080");
  hpBoard = new HPBoard(document.getElementById("hp"));
  calibrationButton =
    new CalibrationButton(document.getElementById("calibration-button"));
  modeManager = new ModeManager();
  motionManager = new MotionManager();
  editor = new Editor(motionManager);
  blockManager = new BlockManager(editor);
});
