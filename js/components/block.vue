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

button[disabled] {
  background-color: #7f8c8d;
  box-shadow: none;
}

.editing-block {
  animation-duration: 1s;
  animation-name: editing-block;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes editing-block {
  from {
    box-shadow: none;
  }
  to {
    box-shadow: 0 0 70px 10px #f39c12;
  }
}

.block-new {
  background-image: url("/images/new.svg");
}

.block-zigzag {
  background-image: url("/images/zigzag.svg");
}

.block-light {
  background-image: url("/images/light.svg");
}

.block-custom {
  background-image: url("/images/custom.svg");
}

.playing-mode-button {
  background-color: #3498db;
}

.playing-mode-button.playing-mode-button-active {
  box-shadow: 0 0 30px 0 #3498db;
}
</style>
