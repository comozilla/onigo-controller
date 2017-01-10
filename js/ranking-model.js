import eventPublisher from "./publisher";

class RankingModel {
  constructor() {
    this.rankingState = "hide";
    eventPublisher.subscribeModel("rankingState", rankingState => {
      this.rankingState = rankingState;
    });

    this.ranking = { ranking: [], onis: {} };
    eventPublisher.subscribeModel("ranking", ranking => {
      this.ranking = ranking;
    });
  }
}

export default new RankingModel();
