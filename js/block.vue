<template>
  <button @click="changeCaption"></button>
</template>

<script>
  var makerModel = require("./makerModel");
  module.exports = {
    methods: {
      changeCaption: function() {
        makerModel.changeCaption();
      }
    }
  };
</script>
