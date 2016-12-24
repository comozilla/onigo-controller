<template>
  <div id="editor" :class="{ 'editor-open': editingBlockIndex !== -1 }">
    <div id="editor-header">
      <input type="text" id="editor-motion-name" placeholder="ここにモーション名を入力しよう" :value="currentBlock.name" />
      <button id="editor-save-button" @click="save">
        <i class="fa fa-floppy-o"></i>
      </button>
      <button id="editor-close-button" @click="closeEditor">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div id="editor-text"></div>
    <div id="parse-log" :class="{ 'parse-success': log.type === 'success', 'parse-error': log.type === 'error'}">
      {{ log.text }}
    </div>
  </div>
</template>

<script>
var appModel = require("./appModel");

var ace = require("brace");
require("brace/mode/javascript");
require("brace/theme/twilight");

var editor;
var isSetupEditor = false;

module.exports = {
  data: function() {
    return appModel.states;
  },
  methods: {
    closeEditor: function() {
      appModel.closeEditor();
    },
    save: function() {
      var parseResult = this.blocks.setMotionAndCompile(this.editingBlockIndex, editor.getValue());
      console.log(parseResult);
    }
  },
  computed: {
    currentBlock: function() {
      if (this.blocks.contains(this.editingBlockIndex)) {
        return this.blocks.get(this.editingBlockIndex);
      }
      return this.blocks.getEmptyBlock();
    },
    log: function() {
      var currentLog = this.blocks.currentParseResult;
      if (currentLog === null) {
        return {
          type: "clear",
          text: ""
        };
      } else if (currentLog.type === "success") {
        return {
          type: "success",
          text: "コードのParseは正しく完了しました。"
        }
      } else if (currentLog.type === "error") {
        return {
          type: "error",
          text: currentLog.errors.join("\n")
        }
      }
    }
  },
  watch: {
    editingBlockIndex: function(newIndex) {
      if (!isSetupEditor && newIndex !== -1) {
        editor = ace.edit("editor-text");
        editor.setTheme("ace/theme/twilight");
        editor.setShowInvisibles(true);
        var session = editor.getSession();
        session.setMode("ace/mode/javascript");
        session.setTabSize(2);
        session.setUseSoftTabs(true);
        isSetupEditor = true;
      }
    }
  }
};

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

#parse-log.parse-success {
  color: green;
}

#parse-log.parse-error {
  color: red;
}

</style>
