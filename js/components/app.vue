<template>
  <div id="root">
    <inactive-screen></inactive-screen>
    <result-screen></result-screen>
    <change-name-screen></change-name-screen>
    <controller-name-screen></controller-name-screen>
    <main>
      <div id="blocks">
        <div class="row">
          <built-in-block :index="0"></built-in-block>
          <built-in-block :index="1"></built-in-block>
          <built-in-block :index="2"></built-in-block>
        </div>
        <div class="row">
          <block :index="3"></block>
          <block :index="4"></block>
          <block :index="5"></block>
        </div>
        <div class="row">
          <block :index="6"></block>
          <block :index="7"></block>
          <block :index="8"></block>
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
import changeUserScreen from "./change-user-screen.vue";
import resultScreen from "./result-screen.vue";

export default {
  components: {
    block,
    builtInBlock,
    editor,
    banner,
    inactiveScreen,
    controllerNameScreen,
    changeUserScreen,
    resultScreen
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
