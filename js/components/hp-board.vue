<template>
  <span id="hp">
    HP:
    <div id="hp-bar">
      <div id="hp-bar-inner" :style="{ width: hpBarWidth }">
      </div>
    </div>
    <span id="hp-text">{{ hp }}</span>
  </span>
</template>

<script>
import eventPublisher from "../publisher";
import appModel from "../app-model";

export default {
  data() {
    return {
      hp: 0
    }
  },
  created() {
    eventPublisher.subscribe("hp", hp => {
      this.hp = hp;
    });
    this.hp = appModel.hp;
  },
  computed: {
    hpBarWidth() {
      return Math.max(0, Math.min(100, this.hp)) + "%";
    }
  }
};

</script>

<style scoped>
#hp {
  display: flex;
  align-items: baseline;
}

#hp-text {
  margin: 0;
  padding: 0;
}

#hp-bar {
  margin: 0 3px;
  padding: 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  width: 100px;
  height: 10px;
}

#hp-bar-inner {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: red;
  width: 100%;
}
</style>

