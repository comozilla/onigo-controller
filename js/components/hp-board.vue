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
import spheroModel from "../sphero-model";

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
    this.hp = spheroModel.hp;
  },
  computed: {
    hpBarWidth() {
      return Math.max(0, Math.min(100, this.hp)) + "%";
    }
  }
};

function HPBoard(element) {
  this.element = element;
  this.hpTextElement = this.element.querySelector("#hp-text");
  this.hpBarElement = this.element.querySelector("#hp-bar-inner");
  this.hp = 0;
  eventPublisher.subscribe("hp", (hp) => {
    this.hp = hp;
    this.updateHP();
  });
  eventPublisher.publish("hp", 100);
}

HPBoard.prototype.updateHP = function() {
  this.hpTextElement.textContent = this.hp.toString();
  this.hpBarElement.style.width = Math.max(0, Math.min(100, this.hp)) + "%";
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

