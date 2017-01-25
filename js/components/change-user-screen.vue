<template>
  <div :class="classList">
    <div id="user-name-inner">
      <h2>ユーザーの名前を変えよう</h2>
      <div id="user-name-zone">
        <input type="text" id="user-name" placeholder="ここに名前を入力しよう" v-model="userName" />
        <button id="submit-user-name" @click="changeUserName">決定</button>
        <button id="cancel-user-name" @click="closeUserNameScreen">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<script>
import eventPublisher from "../publisher";
import appModel from "../app-model";

export default {
  data() {
    return {
      userName: "",
      isShowChangeUserScreen: appModel.isShowChangeUserScreen
    };
  },
  created() {
    eventPublisher.subscribe("isShowChangeUserScreen", isShow => {
      this.isShowChangeUserScreen = isShow;
    });
  },
  computed: {
    classList() {
      return {
        screen: true,
        "screen-active": this.isShowChangeUserScreen
      };
    }
  },
  methods :{
    changeUserName() {
      appModel.changeUserName(this.userName);
      this.closeUserNameScreen();
    },
    closeUserNameScreen() {
      this.userName = "";
      appModel.changeUserScreenState(false);
    }
  }
};
</script>

<style scoped>
#user-name-inner {
  display: flex;
  flex-direction: column;
}

#user-name-zone {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 10%;
}

#user-name {
  flex: 1;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: none;
  font-size: 20px;
  padding-bottom: 5px;
}

#submit-user-name {
  padding: 10px 30px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid white;
  color: white;
  border-radius: 10px;
}

#cancel-user-name {
  padding: 10px 30px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  border: 1px solid white;
  color: white;
  border-radius: 10px;
}
</style>
