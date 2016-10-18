<template>
  <button @click="openEditor">
    <i class="fa fa-times"></i>
  </button>
</template>

<script>
var appModel = require("./appModel");
module.exports = {
  data: function() {
    return appModel.states;
  },
  methods: {
    openEditor: function() {
      appModel.openEditor(0);
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

