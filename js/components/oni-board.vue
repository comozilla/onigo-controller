<template>
  <div :class="oniClassList"></div>
</template>

<script>
import eventPublisher from "../publisher";
import appModel from "../app-model";

export default {
  data() {
    return {
      isOni: false
    };
  },
  created() {
    eventPublisher.subscribe("oni", isOni => {
      this.isOni = isOni;
    });
    this.isOni = appModel.isOni;
  },
  computed: {
    oniClassList() {
      return this.isOni ? "oni-enable" : "";
    }
  }
}
</script>

<style scoped>
.oni-enable {
  background-image: url("/images/player-oni.svg");
}

div {
  background-image: url("/images/player-normal.svg");
  width: 90px;
  height: 90px;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>

