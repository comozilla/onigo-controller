<template>
  <div id="editor" :style="{ width: containerWidth }">
    <div id="editor-header">
      <input type="text" id="editor-motion-name" placeholder="ここにモーション名を入力しよう" />
      <button id="editor-save-button">
        <i class="fa fa-floppy-o"></i>
      </button>
      <button id="editor-close-button" @click="closeEditor">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div id="editor-text"></div>
    <div id="parse-log"></div>
  </div>
</template>

<script>
import eventPublisher from "../publisher";
import appModel from "../app-model";
import ace from "brace";
import "brace/mode/javascript";
import "brace/theme/twilight";

export default {
  data() {
    return {
      editor: null,
      isOpen: false
    }
  },
  methods: {
    closeEditor() {
      appModel.changeOpeningMotionId(-1);
    }
  },
  created() {
    eventPublisher.subscribe("openingMotionId", motionId => {
      this.isOpen = motionId >= 0;
    });
  },
  mounted() {
    this.editor = ace.edit("editor-text");
    this.editor.setTheme("ace/theme/twilight");
    this.editor.setShowInvisibles(true);
    const session = this.editor.getSession();
    session.setMode("ace/mode/javascript");
    session.setTabSize(2);
    session.setUseSoftTabs(true);
  },
  computed: {
    containerWidth() {
      return this.isOpen ? "50vw" : "0";
    }
  }
};
</script>

<style scoped>
#editor {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease 0s;
}

#editor-text {
  min-width: 50%;
  flex: 1;
  border-radius: 10px;
}

#editor-header {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
}

#editor-motion-name {
  flex: 1;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: white;
}

#editor-header button {
  border: none;
  background-color: #c0392b;
  color: white;
  border-radius: 10px;
  padding: 5px 15px;
  margin-left: 5px;
  transition: background-color 0.2s ease 0s;
}

#editor-header button:active {
  background-color: #f39c12;
}

#parse-log {
  height: 4em;
  background-color: #ecf0f1;
  color: black;
  padding: 5px;
  margin-top: 3px;
  border-radius: 10px;
  overflow-y: scroll;
}
</style>


