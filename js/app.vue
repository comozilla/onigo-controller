<template>
  <main>
    <div id="blocks">
      <div class="row">
        <built-in-block type="rotate"></built-in-block>
        <built-in-block type="stop"></built-in-block>
        <built-in-block type="dash"></built-in-block>
      </div>
      <div class="row">
        <block index="0"></block>
        <block index="1"></block>
        <block index="2"></block>
      </div>
      <div class="row">
        <block index="3"></block>
        <block index="4"></block>
        <block index="5"></block>
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
