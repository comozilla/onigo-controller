<template>
  <span :style="{ backgroundColor: color }">{{ color }}</span>
</template>

<script>
import eventPublisher from "../publisher";
import appModel from "../app-model";

export default {
  data() {
    return {
      color: "N/A"
    };
  },
  created() {
    eventPublisher.subscribe("color", color => {
      this.color = color;
    });
    this.color = appModel.color;
  }
};
</script>

<style scoped>
span {
  text-transform: uppercase;
}
</style>
