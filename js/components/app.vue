<template>
  <div>
    <div id="inactive-screen" class="screen">
      <div id="inactive-inner">
      </div>
    </div>
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
    <div id="controller-name-screen" class="screen">
      <div id="controller-name-inner">
        <h2>コントローラーに名前をつけよう</h2>
        <div id="controller-name-zone">
          <input type="text" id="controller-name" placeholder="ここに名前を入力しよう" />
          <button id="submit-controller-name">決定</button>
        </div>
      </div>
    </div>
    <main>
      <div id="blocks">
        <div class="row">
          <built-in-block index="0" command-name="built-in-rotate" label="回転"></built-in-block>
          <built-in-block index="1" command-name="built-in-stop" label="停止"></built-in-block>
          <built-in-block index="2" command-name="built-in-dash" label="加速"></built-in-block>
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
      <div id="editor">
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
    </main>
    <footer>
      <section id="making-mode-banner">
        <button style="display: none">ほぞん</button>
        <img src="images/mode-make.svg" />
      </section>
      <section id="playing-mode-banner">
        <span id="color"></span>
        <span id="game-status-label">ゲームは開始されていません！</span>
        <span id="hp">
          HP:
          <div id="hp-bar">
            <div id="hp-bar-inner">
            </div>
          </div>
          <span id="hp-text"></span>
        </span>
        <div id="oni"></div>
        <button id="calibration-button" style="display: none">位置補正</button>
        <img src="images/mode-play.svg" />
      </section>
      <button id="switch-mode-button">モードきりかえ</button>
    </footer>
  </div>
</template>

<script>
import block from "./block.vue";
import builtInBlock from "./built-in-block.vue";
export default {
  components: {
    block,
    builtInBlock
  }
};
</script>
