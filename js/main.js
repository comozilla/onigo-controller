import Joystick from "./joystick";
import CalibrationButton from "./calibration-button";
import HPBoard from "./hp-board";
import InactiveStatus from "./inactive-status";
import SpheroStates from "./sphero-states";
import SpheroClient from "./sphero-client";
import ModeManager from "./mode-manager";
import BlockManager from "./block-manager";

// webpack
import "../css/style.css";

var spheroStates;
var spheroClient;
var joystick;
var calibrationButton;
var hpBoard;
var inactiveStatus;
var modeManager;
var blockManager;

document.addEventListener("DOMContentLoaded",　function() {
  inactiveStatus = new InactiveStatus();
  spheroStates = new SpheroStates();
  spheroClient = new SpheroClient("ws://localhost:8080");
  joystick = new Joystick();
  hpBoard = new HPBoard(document.getElementById("hp"));
  calibrationButton = new CalibrationButton(document.getElementById("calibration-button"));
  modeManager = new ModeManager();
  blockManager = new BlockManager();
});
