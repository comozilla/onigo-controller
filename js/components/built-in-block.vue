<template>
  <button :data-block-index="index" :class="className">{{label}}</button>
</template>

<script>
import blockManagerModel from "../block-manager-model";

export default {
  props: ["index"],
  data() {
    return {
      label: "N/A",
      className: "N/A"
    }
  },
  created() {
    var builtInBlock = blockManagerModel.getBuiltInBlock(this.index);
    this.label = builtInBlock.label;
    this.className = builtInBlock.className;
  }
}
</script>

<style scoped>
button {
  width: 150px;
  height: 150px;
  color: white;
  background-color: #e74c3c;
  border: none;
  border-radius: 20px;
  margin: 0 0 10px 10px;
  background-position: center 30%;
  background-repeat: no-repeat;
  padding-top: calc(150px - 2em);
}

.built-in-rotate {
  background-image: url("/images/turn.svg");
}

.built-in-stop {
  background-image: url("/images/stop.svg");
}

.built-in-dash {
  background-image: url("/images/dash.svg");
}
</style>
