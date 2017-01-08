<template>
  <button :data-block-index="index" :class="className" @click="openEditor">
    {{blockName}}
  </button>
</template>

<script>
import eventPublisher from "../publisher";
import mode from "../mode";
import Command from "../command";
import blockManagerModel from "../block-manager-model";
import appModel from "../app-model";

const customSymbol = Symbol("custom");
const classes = new Map([
  ["NEW!", "block-new"],
  ["ジグザグ", "block-zigzag"],
  ["光る", "block-light"],
  [customSymbol, "block-custom"]
]);

export default {
  props: ["index"],
  data() {
    return {
      blockName: "N/A",
      className: "N/A"
    }
  },
  methods: {
    openEditor() {
      appModel.changeOpeningMotionId(this.index);
    }
  },
  created() {
    this.blockName = blockManagerModel.getBlock(this.index).blockName;
    eventPublisher.subscribe("changeBlockName", (index, blockName) => {
      if (parseInt(this.index) === index) {
        this.blockName = blockName;
      }
    });
  },
  watch: {
    blockName() {
      if (classes.has(this.blockName)) {
        this.className = classes.get(this.blockName);
      } else {
        this.className = classes.get(customSymbol);
      }
    }
  }
};
</script>

<style scoped>
button {
  width: 150px;
  height: 150px;
  color: white;
  background-color: #f39c12;
  border: none;
  border-radius: 20px;
  margin: 0 0 10px 10px;
  background-position: center 30%;
  background-repeat: no-repeat;
  padding-top: calc(150px - 2em);
}
</style>
