<template>
  <footer>
    <section id="making-mode-banner" :class="makingClassList">
      <img src="images/mode-make.svg" />
    </section>
    <section id="playing-mode-banner" :class="playingClassList">
      <game-status-label></game-status-label>
      <color-board></color-board>
      <hp-board></hp-board>
      <oni-board></oni-board>
      <img src="images/mode-play.svg" />
    </section>
    <change-user-button></change-user-button>
    <button id="switch-mode-button" @click="toggleMode">モードきりかえ</button>
  </footer>
</template>

<script>
import hpBoard from "./hp-board.vue";
import colorBoard from "./color-board.vue";
import oniBoard from "./oni-board.vue";
import gameStatusLabel from "./game-status-label.vue";
import changeUserButton from "./change-user-button.vue";
import appModel from "../app-model";
import eventPublisher from "../publisher";
import mode from "../mode";

export default {
  components: {
    hpBoard,
    colorBoard,
    oniBoard,
    gameStatusLabel,
    changeUserButton
  },
  data() {
    return {
      mode: null
    };
  },
  methods: {
    toggleMode() {
      appModel.toggleMode();
    }
  },
  created() {
    eventPublisher.subscribe("mode", mode => {
      this.mode = mode;
    });
    this.mode = appModel.mode;
  },
  computed: {
    makingClassList() {
      return this.mode === mode.making ? "active-banner" : "";
    },
    playingClassList() {
      return this.mode === mode.playing ? "active-banner" : "";
    }
  }
};
</script>

<style scoped>
footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

span, button, img, div {
  font-size: 16px;
  padding: 5px;
  margin: 5px;
  border: none;
  color: white;
  border-radius: 10px;
}

#making-mode-banner span {
  background-color: #e67e22;
}

#making-mode-banner button {
  background-color: #c0392b;
}

#playing-mode-banner span {
  background-color: #2980b9;
}

#playing-mode-banner button {
  background-color: #8e44ad;
}

section {
  display: none;
}

.active-banner {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
}

#switch-mode-button {
  background-color: #16a085;
}

</style>
