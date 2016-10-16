<template>
  <div id="editor" v-bind:class="{ 'editor-open': isOpeningEditor }">
    <textarea></textarea>
  </div>
</template>

<script>
var appModel = require("./appModel");
module.exports = {
  data: function() {
    return appModel.states;
  }
}
</script>

<style scoped>
#editor {
  width: 50%;
  overflow: hidden;
  flex-direction: column;
  display: none;
}

#editor.editor-open {
  display: flex;
}
</style>
