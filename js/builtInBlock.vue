<template>
  <button>{{builtInBlocks[type]}}</button>
</template>

<script>
  var makerModel = require("./makerModel");
  module.exports = {
    props: ["type"],
    data: function() {
      return makerModel.states;
    }
  };
</script>
