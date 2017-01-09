import ResultScreen from "./result-screen";
import ControllerNameScreen from "./controller-name-screen";
import SpheroClient from "./sphero-client";
import Parser from "./parser";
import Backup from "./backup";

import Vue from "vue";
import appOptions from "./components/app.vue";


// webpack
import "../css/style.css";
import "font-awesome";
import "web-animations-js";

document.addEventListener("DOMContentLoaded", function() {
  const app = new Vue(appOptions).$mount("#app");
  const spheroClient = new SpheroClient("ws://localhost:8080");
  new ResultScreen();
  new ControllerNameScreen(spheroClient);
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
