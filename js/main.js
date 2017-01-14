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
  let isConnected = false;

  eventPublisher.subscribe("server", server => {
    if (!isConnected) {
      const script = document.createElement("script");
      script.src = `http://${server}/client/sphero-client.js`;
      script.addEventListener("load", () => {
        spheroClient.connect(`ws://${server}`);
      });
      document.head.appendChild(script);

      isConnected = true;
    }
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
