<template>
  <main>
    <div id="blocks">
      <div class="row">
        <built-in-block type="rotate"></built-in-block>
        <built-in-block type="stop"></built-in-block>
        <built-in-block type="dash"></built-in-block>
      </div>
      <div class="row">
        <block></block>
        <block></block>
        <block></block>
      </div>
      <div class="row">
        <block></block>
        <block></block>
        <block></block>
      </div>
    </div>
    <editor></editor>
  </main>
</template>

<script>
  module.exports = {
    components: {
      block: require("./block.vue"),
      builtInBlock: require("./builtInBlock.vue"),
      editor: require("./editor.vue")
    }
  };
</script>

<style scoped>
main {
  flex: 1;
  display: flex;
  padding: 20px;
}

#blocks {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.row {
  display: flex;
  justify-content: center;
}
</style>
