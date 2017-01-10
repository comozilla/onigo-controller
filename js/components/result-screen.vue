<template>
  <div id="result-screen" :class="screenClassList">
    <div id="result-inner">
      <div id="ranking-column">
        <h2>ランキング</h2>
        <ol id="ranking">
          <ranking-item
              v-for="(rankingItem, index) in ranking"
              :name="rankingItem.name"
              :hp="rankingItem.states.hp"
              :rank="getRank(index)"
              :color="rankingItem.states.color">
          </ranking-item>
        </ol>
      </div>
      <div id="result-oni-column">
        <h2>おに</h2>
        <ul id="result-oni">
          <li v-for="oniName in oniNames">{{ oniName }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import eventPublisher from "../publisher";
import rankingModel from "../ranking-model";
import rankingItem from "./ranking-item.vue";

export default {
  components: {
    rankingItem
  },
  data() {
    return {
      rankingState: rankingModel.rankingState,
      rankingDetails: rankingModel.ranking
    };
  },
  methods: {
    getRank(index) {
      for (var i = index; i >= 0; i--) {
        if (!this.rankingDetails.ranking[i].isTie) {
          return i + 1;
        }
      }
      return 0;
    }
  },
  created() {
    eventPublisher.subscribe("rankingState", rankingState => {
      this.rankingState = rankingState;
    });
    eventPublisher.subscribe("ranking", ranking => {
      this.rankingDetails = ranking;
    });
  },
  computed: {
    screenClassList() {
      return {
        screen: true,
        "screen-active": this.rankingState === "show"
      };
    },
    ranking() {
      return this.rankingDetails.ranking;
    },
    oniNames() {
      return Object.keys(this.rankingDetails.onis);
    }
  }
};

</script>

<style scoped>
#result-inner {
  display: flex;
}

#result-inner > div {
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

#ranking, #result-oni {
  flex: 1;
  overflow-y: scroll;
  margin: 0;
  padding: 0;
}
</style>
