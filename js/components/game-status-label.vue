<template>
  <span>{{ text }}</span>
</template>

<script>
import eventPublisher from "../publisher";
import appModel from "../app-model";

export default {
  data() {
    return {
      gameState: "N/A"
    };
  },
  created() {
    eventPublisher.subscribe("gameState", gameState => {
      this.gameState = gameState;
    });
    this.gameState = appModel.gameState;
  },
  computed: {
    text() {
      return this.gameState === "active" ? "ゲーム中" : "ゲームは開始されていません！";
    }
  }
};
</script>

<style scoped>
</style>

