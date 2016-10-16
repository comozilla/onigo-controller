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
  </main>
</template>

<script>
  module.exports = {
    components: {
      block: require("./block.vue"),
      builtInBlock: require("./builtInBlock.vue")
    }
  };
</script>
