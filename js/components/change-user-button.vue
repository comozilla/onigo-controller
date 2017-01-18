<template>
  <button @click="showLoginForm">ユーザーきりかえ</button>
</template>

<script>
import eventPublisher from "../publisher";
import appModel from "../app-model";

export default {
  methods: {
    showLoginForm() {
      appModel.changeIsShowLoginForm(true);
    }
  }
};
</script>

<style scoped>
button {
  background-color: #3498db;
}
</style>
