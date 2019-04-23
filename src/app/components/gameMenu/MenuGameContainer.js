import { connect } from "react-redux";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import MenuGameComponent from "./MenuGameComponent";
import { authOperations } from "../../apis/auth-api";
import { manageGameOperations } from "../../apis/game-manage-api";

const mapStateToProps = state => {
	const users = state.firestore ? state.firestore.ordered.users : [];
  return {
		auth: state.firebase.auth,
		loginSuccess: state.auth.loginSuccess,
		userId: state.auth.userId,
		users,
		gameData:state.gameManageReducer.gameData
  };
};

const mapDispatchToProps = dispatch => {
  const login = (history) => loginFormData => {
    console.log("loginFormDataContainer-> loginFormData: ", loginFormData);
    //dispatch(submitWishOperations.submitWishOperation(loginFormData));
    dispatch(authOperations.loginOperation(history)(loginFormData));
	};
	
	const initGame = history => initGameData => {
    console.log("loginFormDataContainer-> loginFormData: ", initGameData);
    //dispatch(submitWishOperations.submitWishOperation(loginFormData));
    dispatch(manageGameOperations.initGameOperation(history)(initGameData));
	};
	
	const acceptGame = history => gameId => {
		if(gameId) {
			dispatch(manageGameOperations.acceptGameOperation(history)(gameId));
     };
	}
  return {
		login,
		initGame,
		acceptGame
  };
};

const MenuGameContainer = compose(
	connect(
  mapStateToProps,
  mapDispatchToProps
),
firestoreConnect(props => {
	return [{collection: "users"}];
})
)(MenuGameComponent);


export default MenuGameContainer;
