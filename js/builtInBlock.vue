<template>
  <button>{{builtInBlocks[type]}}</button>
</template>

<script>
  var appModel = require("./appModel");
  module.exports = {
    props: ["type"],
    data: function() {
      return appModel.states;
    }
  };
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
</style>
