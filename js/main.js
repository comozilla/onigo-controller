import Backup from "./backup";
import spheroClient from "./sphero-client";

import Vue from "vue";
import appOptions from "./components/app.vue";


// webpack
import "../css/style.css";
import "font-awesome";
import "web-animations-js";

document.addEventListener("DOMContentLoaded", function() {
  const app = new Vue(appOptions).$mount("#app");
  spheroClient.connect("ws://localhost:8080");
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
