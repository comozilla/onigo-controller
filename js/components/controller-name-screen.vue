<template>
  <div id="controller-name-screen" :class="screenClassList">
    <div id="controller-name-inner">
      <h2>コントローラーに名前をつけよう</h2>
      <div id="controller-name-zone">
        <input type="text" id="controller-name" placeholder="ここに名前を入力しよう" v-model="controllerName" />
        <button id="submit-controller-name" @click="requestName">{{ submitButtonLabel }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import eventPublisher from "../publisher";
import controllerNameModel from "../controller-name-model";

export default {
  data() {
    return {
      isShow: false,
      controllerName: "",
      isRequesting: false
    };
  },
  computed: {
    screenClassList() {
      return {
        screen: true,
        "screen-active": this.isShow
      };
    },
    submitButtonLabel() {
      return this.isRequesting ? "サーバーの応答を待っています..." : "決定";
    }
  },
  created() {
    eventPublisher.subscribe("isNeedNewName", isNeed => {
      this.isShow = isNeed;
    });
    this.isShow = controllerNameModel.isNeedNewName;
  },
  methods: {
    requestName() {
      controllerNameModel.requestName(this.controllerName).then(() => {
        this.isRequesting = false;
      }, () => {
        // Rejected
        this.controllerName = "";
        this.isRequesting = false;
      });
      this.isRequesting = true;
    }
  }
};
</script>

<style scoped>
#controller-name-screen {
  z-index: 6;
}

#controller-name-inner {
  display: flex;
  flex-direction: column;
}

#controller-name-zone {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10%;
}

#controller-name {
  flex: 1;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: none;
  font-size: 20px;
  padding-bottom: 5px;
}

#submit-controller-name {
  padding: 10px 30px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid white;
  color: white;
  border-radius: 10px;
}
</style>
