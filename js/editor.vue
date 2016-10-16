<template>
  <div id="editor" v-bind:class="{ 'editor-open': isOpeningEditor }">
    <div id="editor-header">
      <input type="text" id="editor-motion-name" placeholder="ここにモーション名を入力しよう" />
      <button id="editor-save-button">
        <i class="fa fa-floppy-o"></i>
      </button>
      <button id="editor-close-button">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <div id="editor-text"></div>
    <div id="parse-log"></div>
  </div>
</template>

<script>
 var appModel = require("./appModel");

 var ace = require("brace");
 require("brace/mode/javascript");
 require("brace/theme/twilight");

 var editor;

 document.addEventListener("DOMContentLoaded", function() {
   editor = ace.edit("editor-text");
   editor.setTheme("ace/theme/twilight");
   editor.setShowInvisibles(true);
   var session = editor.getSession();
   session.setMode("ace/mode/javascript");
   session.setTabSize(2);
   session.setUseSoftTabs(true);
 });

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
