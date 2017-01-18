<template>
  <div :class="classList">
    <div>
      <h2>テスト</h2>
      <input type="text" />
    </div>
  </div>
</template>

<script>
import eventPublisher from "../publisher";
import appModel from "../app-model";

export default {
  data() {
    return {
      isShowLoginForm: appModel.isShowLoginForm
    };
  },
  created() {
    eventPublisher.subscribe("isShowLoginForm", isShow => {
      this.isShowLoginForm = isShow;
    });
  },
  computed: {
    classList() {
      return {
        screen: true,
        "screen-active": this.isShowLoginForm
      };
    }
  }
};
</script>

<style scoped>
</style>
