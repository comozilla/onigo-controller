<template>
  <footer>
    <section id="making-mode-banner" :class="makingClassList">
      <img src="images/mode-make.svg" />
    </section>
    <section id="playing-mode-banner" :class="playingClassList">
      <span id="color"></span>
      <span id="game-status-label">ゲームは開始されていません！</span>
      <hp-board></hp-board>
      <div id="oni"></div>
      <button id="calibration-button" style="display: none">位置補正</button>
      <img src="images/mode-play.svg" />
    </section>
    <button id="switch-mode-button" @click="toggleMode">モードきりかえ</button>
  </footer>
</template>

<script>
import hpBoard from "./hp-board.vue";
import appModel from "../app-model";
import eventPublisher from "../publisher";
import mode from "../mode";

export default {
  components: {
    hpBoard
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

.oni-enable {
  background-image: url("/images/player-oni.svg");
}

#oni {
  background-image: url("/images/player-normal.svg");
  width: 90px;
  height: 90px;
  background-size: 100%;
  background-repeat: no-repeat;
}

#color {
  text-transform: uppercase;
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
