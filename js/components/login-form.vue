<template>
  <div id="login-form" style="display:none">
    <span>テスト</span>
    <input type="text" />
  </div>
</template>

<script>
import eventPublisher from "../publisher";

export default {
  created() {
    eventPublisher.subscribe("showLoginForm", isShow => {
      this.showThisForm(isShow);
    });
  },
  methods: {
    showThisForm(isShow) {
      const displayValue = isShow ? "inline" : "none";
      document.getElementById("login-form").style = "display:" + displayValue;
    }
  }
};
</script>

<style>

</style>
