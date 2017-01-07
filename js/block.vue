<template>
  <button @click="openEditor">
    {{currentBlock.name}}
  </button>
</template>

<script>
var appModel = require("./appModel");
var blocksModel = require("./blocksModel");

module.exports = {
  props: ["index"],
  data: function() {
    return {
      app: appModel.states,
      blocks: blocksModel.states
    };
  },
  methods: {
    openEditor: function() {
      appModel.openEditor(0);
    },
    containsBlock: function() {
      return blocksModel.contains(parseInt(this.index));
    }
  },
  watch: {
    "blocks._data.blocks": function() {
      console.log("HOGE");
    }
  },
  computed: {
    currentBlock: function() {
      if (!this.containsBlock()) {
        blocksModel.setName(parseInt(this.index), "無名のモーション");
      }
      return this.blocks.blocks[parseInt(this.index)];
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
