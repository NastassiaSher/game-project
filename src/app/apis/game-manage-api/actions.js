import { createActions } from "reduxsauce";

const { Creators, Types } = createActions({
  submitGameRequest: ["submitGameData"],
  submitGameSuccess: ["submitGameResponse"],
	submitGameFailure: ["submitGameError"],
	
	initGameRequest: ["initGameData"],
  initGameSuccess: ["initGameResponse"],
	initGameFailure: ["initGameError"],
	
	updateGameRequest: ["updateGameData"],
  updateGameSuccess: ["updateGameResponse"],
	updateGameFailure: ["updateGameError"],
	
	acceptGameRequest: ["acceptGameData"],
  acceptGameSuccess: ["acceptGameResponse"],
	acceptGameFailure: ["acceptGameError"],
	
	endGameRequest: ["endGameData"],
  endGameSuccess: ["endGameResponse"],
  endGameFailure: ["endGameError"]

});

export { Creators, Types };