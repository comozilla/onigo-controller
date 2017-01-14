import eventPublisher from "./publisher";

class RankingModel {
  constructor() {
    this.rankingState = "hide";
    eventPublisher.subscribeModel("rankingState", rankingState => {
      this.rankingState = rankingState;
    });

    this.rankingDetails = { ranking: [], onis: {} };
    eventPublisher.subscribeModel("rankingDetails", rankingDetails => {
      this.rankingDetails = rankingDetails;
    });
  }
}

export default new RankingModel();
