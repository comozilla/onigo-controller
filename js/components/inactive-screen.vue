<template>
  <div id="inactive-screen" :class="screenClassList">
    <div id="inactive-inner">
      {{ text }}
    </div>
  </div>
</template>

<script>
import eventPublisher from "../publisher";

export default {
  data() {
    return {
      screenState: "N/A"
    };
  },
  created() {
    eventPublisher.subscribe("ws-connected", () => {
      this.screenState = "connected";
    });
    eventPublisher.subscribe("ws-error", () => {
      this.screenState = "error";
    });
    eventPublisher.subscribe("ws-not-found", () => {
      this.screenState = "not-found";
    });
    eventPublisher.subscribe("acceptName", () => {
      this.screenState = "named";
    });
    this.screenState = "connecting";
  },
  computed: {
    text() {
      switch (this.screenState) {
        case "connecting":
          return "サーバーに接続しています...";
        case "not-found":
          return "サーバーが見つかりませんでした。";
        case "error":
          return "通信でエラーが発生しました。";
        case "active":
          return "接続しました。ControllerName を決めています...";
        default:
          return "";
      }
    },
    screenClassList() {
      return {
        screen: true,
        "screen-active": this.screenState !== "named"
      };
    }
  }
};
</script>
