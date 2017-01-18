<template>
  <button @click="showLoginForm">ユーザーきりかえ</button>
</template>

<script>
import eventPublisher from "../publisher";

export default {
  methods: {
    showLoginForm() {
      eventPublisher.publish("showLoginForm", true);
    }
  }
};
</script>

<style scoped>
button {
  background-color: #3498db;
}
</style>
