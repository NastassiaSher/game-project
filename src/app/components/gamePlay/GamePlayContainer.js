import { connect } from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import GamePlayComponent from "./GamePlayComponent";
import { manageGameOperations } from "../../apis/game-manage-api";

const mapStateToProps = (state, ownProps) => {
	const games = state.firestore ? state.firestore.ordered.games : [];
  return {
		gameId: ownProps.match.params.id,
		gameData: games && games[0],
		userId: state.auth.userId,
		auth: state.firebase.auth,
		loginSuccess: state.auth.loginSuccess,
  };
};

const mapDispatchToProps = dispatch => {
	
	const updateGame = selected => data => {
    //dispatch(submitWishOperations.submitWishOperation(loginFormData));
    dispatch(manageGameOperations.updateGameOperation(selected)(data));
	};
	
	const endGame = history => data => {
    //dispatch(submitWishOperations.submitWishOperation(loginFormData));
    dispatch(manageGameOperations.endGameOperation(history)(data));
  };

  return {
		updateGame,
		endGame
  };
};

const GamePlayContainer = compose(
	connect(
  mapStateToProps,
  mapDispatchToProps
),
firestoreConnect(props => {
	return [{collection: "games", doc: props.gameId}];
})
)(GamePlayComponent);


export default GamePlayContainer;
