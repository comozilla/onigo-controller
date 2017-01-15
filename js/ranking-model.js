import eventPublisher from "./publisher";

class RankingModel {
  constructor() {
    this.rankingState = "hide";
    eventPublisher.subscribeModel("rankingState", rankingState => {
      this.rankingState = rankingState;
    });

    this.playerState = { ranking: [], onis: {} };
    eventPublisher.subscribeModel("playerState", playerState => {
      this.playerState = playerState;
    });
  }
}

export default new RankingModel();
