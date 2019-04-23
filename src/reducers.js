import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import gameManageReducer from "./app/apis/game-manage-api";
import authReducer from "./app/apis/auth-api";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  form: formReducer,
  gameManageReducer: gameManageReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer
});

export default rootReducer;
