<template>
  <button @data-block-index="index">
  </button>
</template>

<script>
import eventPublisher from "../publisher";
import mode from "../mode";
import Command from "../command";

const customSymbol = Symbol("custom");
const classes = new Map([
  ["NEW!", "block-new"],
  ["ジグザグ", "block-zigzag"],
  ["光る", "block-light"],
  [customSymbol, "block-custom"]
]);

export default {
  props: ["index"]
}

function Block(blockId, element, blockManager, builtInCommand) {
  this.blockId = blockId;
  this.element = element;

  this.builtInCommand = typeof builtInCommand !== "undefined" ? builtInCommand : null;

  this.enable = true;
  this.blockManager = blockManager;
  this.mode = mode.making;
  this.blockName = "NEW!";
  this.gameState = "";
  this.motion = null;
  this.sequence = null;

  if (this.builtInCommand !== null) {
    this.element.classList.add("built-in-command-button");
  }

  this.element.addEventListener("click", () => {
    if (this.mode === mode.making && this.builtInCommand === null) {
      this.blockManager.editor.open(this.blockId, this.motion);

      const currentEditingBlock = document.querySelector(".editing-block");
      if (currentEditingBlock !== null) {
        currentEditingBlock.classList.remove("editing-block");
      }
      this.element.classList.add("editing-block");
    } else if (this.mode === mode.playing) {
      if (this.gameState === "active") {
        if (this.builtInCommand !== null) {
          eventPublisher.publish("changeCurrentCommands", [this.builtInCommand]);
        } else {
          eventPublisher.publish("changeCurrentCommands", this.sequence);
        }
      }
    }
  });

  eventPublisher.subscribe("mode", newMode => {
    this.mode = newMode;
    if (newMode === mode.making) {
      this.element.classList.remove("playing-mode-button");
    } else if (newMode === mode.playing) {
      this.element.classList.add("playing-mode-button");
      this.element.classList.remove("editing-block");
    }
  });

  eventPublisher.subscribe("compile", args => {
    if (args.motionId === this.blockId) {
      this.sequence = args.commands;
      this.motion = args.motion;
      this.blockName = args.motion.motionName;
      this.showBlockName();
    }
  });

  eventPublisher.subscribe("gameState", (gameState) => {
    this.gameState = gameState;
    if (this.gameState === "active") {
      this.element.classList.add("playing-mode-button-active");
    } else if (this.gameState === "inactive") {
      this.element.classList.remove("playing-mode-button-active");
    }
  });
}

Block.prototype.setEnable = function(enable) {
  this.enable = enable;
  this.element.disabled = !this.enable;
  this.showBlockName();
};

Block.prototype.showBlockName = function() {
  if (this.builtInCommand === null && this.enable) {
    this.element.textContent = this.blockName;

    const blockName = classes.has(this.blockName) ? this.blockName : customSymbol;
    for (let className of classes.values()) {
      if (className !== classes.get(blockName)) {
        this.element.classList.remove(className);
      }
    }
    this.element.classList.add(classes.get(blockName));
  }
};

</script>

<style scoped>
button {
  width: 150px;
  height: 150px;
  color: white;
  background-color: #f39c12;
  border: none;
  border-radius: 20px;
  margin: 0 0 10px 10px;
  background-position: center 30%;
  background-repeat: no-repeat;
  padding-top: calc(150px - 2em);
}
</style>
