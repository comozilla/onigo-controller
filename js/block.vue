<template>
  <button @click="openEditor">
    {{currentBlock.name}}
  </button>
</template>

<script>
var appModel = require("./appModel");
module.exports = {
  props: ["index"],
  data: function() {
    return appModel.states;
  },
  methods: {
    openEditor: function() {
      appModel.openEditor(0);
    },
    containsBlock: function() {
      return typeof this.blocks[parseInt(this.index)] !== "undefined";
    }
  },
  computed: {
    currentBlock: function() {
      if (!this.containsBlock()) {
        this.blocks[parseInt(this.index)] = {
          name: "無名のモーション"
        };
      }
      return this.blocks[parseInt(this.index)];
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
