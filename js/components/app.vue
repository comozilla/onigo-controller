<template>
  <div id="root">
    <inactive-screen></inactive-screen>
    <controller-name-screen></controller-name-screen>
    <div id="result-screen" class="screen">
      <div id="result-inner">
        <div id="ranking-column">
          <h2>ランキング</h2>
          <ol id="ranking">
          </ol>
        </div>
        <div id="result-oni-column">
          <h2>おに</h2>
          <ul id="result-oni">
          </ul>
        </div>
      </div>
    </div>
    <main>
      <div id="blocks">
        <div class="row">
          <built-in-block index="0"></built-in-block>
          <built-in-block index="1"></built-in-block>
          <built-in-block index="2"></built-in-block>
        </div>
        <div class="row">
          <block index="3"></block>
          <block index="4"></block>
          <block index="5"></block>
        </div>
        <div class="row">
          <block index="6"></block>
          <block index="7"></block>
          <block index="8"></block>
        </div>
      </div>
      <editor></editor>
    </main>
    <banner></banner>
  </div>
</template>

<script>
import block from "./block.vue";
import builtInBlock from "./built-in-block.vue";
import editor from "./editor.vue";
import banner from "./banner.vue";
import inactiveScreen from "./inactive-screen.vue";
import controllerNameScreen from "./controller-name-screen.vue";

export default {
  components: {
    block,
    builtInBlock,
    editor,
    banner,
    inactiveScreen,
    controllerNameScreen
  }
};
</script>

<style scoped>
#root {
  background-color: #34495e;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

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

#blocks .row {
  display: flex;
  justify-content: center;
}
</style>
