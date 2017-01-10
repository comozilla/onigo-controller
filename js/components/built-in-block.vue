<template>
  <button :data-block-index="index" :class="classList" @click="runCommand">{{ label }}</button>
</template>

<script>
import blockManagerModel from "../block-manager-model";
import appModel from "../app-model";
import eventPublisher from "../publisher";
import mode from "../mode";

export default {
  props: ["index"],
  data() {
    return {
      block: blockManagerModel.getBuiltInBlock(this.index),
      mode: appModel.mode,
      gameState: appModel.gameState
    };
  },
  methods: {
    runCommand() {
      appModel.changeCurrentCommands([this.command]);
    }
  },
  created() {
    eventPublisher.subscribe("mode", mode => {
      this.mode = mode;
    });
    eventPublisher.subscribe("gameState", gameState => {
      this.gameState = gameState;
    });
  },
  computed: {
    classList() {
      var classList = [this.className];
      if (this.mode === mode.playing) {
        classList.push("playing-mode-button");
        if (this.gameState === "active") {
          classList.push("playing-mode-button-active");
        }
      }
      return classList.join(" ");
    },
    label() {
      return this.block.label;
    },
    className() {
      return `built-in-${this.block.name}`;
    },
    command() {
      return this.block.command;
    }
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

.playing-mode-button {
  background-color: #3498db;
}

.playing-mode-button.playing-mode-button-active {
  box-shadow: 0 0 30px 0 #3498db;
}
</style>
