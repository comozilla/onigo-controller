import CalibrationButton from "./calibration-button";
import HPBoard from "./hp-board";
import OniBoard from "./oni-board";
import ColorBoard from "./color-board";
import GameStatusLabel from "./game-status-label";
import InactiveScreen from "./inactive-screen";
import ResultScreen from "./result-screen";
import ControllerNameScreen from "./controller-name-screen";
import SpheroClient from "./sphero-client";
import ModeManager from "./mode-manager";
import BlockManager from "./block-manager";
import Editor from "./editor";
import Parser from "./parser";
import Backup from "./backup";

import Vue from "vue";
import appOptions from "./components/app.vue";


// webpack
import "../css/style.css";
import "font-awesome";
import "web-animations-js";

document.addEventListener("DOMContentLoaded", function() {
  console.log(appOptions);
  const app = new Vue(appOptions).$mount("#app");
  const editor = new Editor();
  new InactiveScreen();
  const spheroClient = new SpheroClient("ws://localhost:8080");
  new ResultScreen();
  new ControllerNameScreen(spheroClient);
  new HPBoard(document.getElementById("hp"));
  new OniBoard(document.getElementById("oni"));
  new ColorBoard(document.getElementById("color"));
  new GameStatusLabel(document.getElementById("game-status-label"));
  new CalibrationButton(document.getElementById("calibration-button"));
  new ModeManager();
  new BlockManager(editor);
  new Parser(document.getElementById("parse-log"));
  const backup = new Backup();
  if (backup.has()) {
    backup.restore();
  }
  window.ocConsole = {
    getClientId: function() {
      return spheroClient.clientKey;
    },
    backup: backup
  };
});
