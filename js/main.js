import Backup from "./backup";
import spheroClient from "./sphero-client";

import Vue from "vue";
import appOptions from "./components/app.vue";
import appModel from "./app-model";
import eventPublisher from "./publisher";

// webpack
import "../css/style.css";
import "font-awesome";
import "web-animations-js";

document.addEventListener("DOMContentLoaded", function() {
  const app = new Vue(appOptions).$mount("#app");

  eventPublisher.subscribe("server", server => {
    spheroClient.connect(`ws://${server}`);
  });
  appModel.changeServer("localhost:8080");

  const backup = new Backup();
  backup.restore();

  window.ocConsole = {
    getClientId: function() {
      return spheroClient.clientKey;
    },
    backup: backup
  };
});
