// operations.js
import { Creators } from "./actions";

const loginRequest = Creators.loginRequest;
const loginSuccess = Creators.loginSuccess;
const loginFailure = Creators.loginFailure;

const signupRequest = Creators.signupRequest;
const signupSuccess = Creators.signupSuccess;
const signupFailure = Creators.signupFailure;

const signoutRequest = Creators.signoutRequest;
const signoutSuccess = Creators.signoutSuccess;
const signoutFailure = Creators.signoutFailure;

const initAppRequest = Creators.initAppRequest;
const initAppSuccess = Creators.initAppSuccess;
const initAppFailure = Creators.initAppFailure;

const cleanLoginError = Creators.cleanLoginError;

const cleanLoginErrorOperation = () => {
  return (dispatch, getState) => {
    console.log("cleanLoginError - : ");
    dispatch(cleanLoginError());
  };
};

const loginOperation = (history) => loginData => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
		console.log("loginOperation - : ", loginData);
		console.log("loginOperation - : ");
    dispatch(loginRequest(loginData));
		const firebase = getFirebase();
		const firestore = getFirestore();
		let response;
    firebase
      .auth()
      .signInWithEmailAndPassword(loginData.loginEmail, loginData.loginPassword)
      .then((res) => {

				response = res.user.uid;
				return firestore
				.collection("users")
				.doc(res.user.uid)
				.update({
					status: "loggedIn",
					gameId: null
				});
			})
			.then(() => {
				      dispatch(loginSuccess(response));
							history.push("/main");
			})
      .catch(err => {
        dispatch(loginFailure(err));
      });
  };
};

const signupOperation = signupPayload => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("signupOperation - : ", signupPayload);
    dispatch(signupRequest(signupPayload));
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        signupPayload.email,
        signupPayload.password
      )
      .then(res => {
        return firestore
          .collection("users")
          .doc(res.user.uid)
          .set({
            firstName: signupPayload.firstName,
            lastName: signupPayload.lastName,
            initials: signupPayload.firstName[0] + signupPayload.lastName[0]
          });
      })
      .then(() => {
        dispatch(signupSuccess());
      })
      .catch(err => {
        dispatch(signupFailure(err));
      });
  };
};

const signoutOperation = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("loginOperation - : ");
    dispatch(signoutRequest());
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(signoutSuccess());
        console.log("signoutSuccess - : ");
      })
      .catch(err => {
        dispatch(signoutFailure(err));
      });
  };
};

const initAppOperation = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("initAppOperation - : ");
    dispatch(initAppRequest());
		const firebase = getFirebase();
		const firestore = getFirestore();
		const users = ['VrXml3jJ5EYKsQmaF27EzomNqAt2', 'jHzJZr3flsO5HUDVLeYHVaRaNen2'];
		firestore
				.collection("users")
				.doc(users[0])
				.update({
					status: "loggedOut",
					gameId: null
				})
				.then(() => {
					return firestore
					.collection("users")
					.doc(users[1])
					.update({
						status: "loggedOut",
						gameId: null
					});
				}).then(() => {
					dispatch(initAppSuccess());
				})
      .catch(err => {
				console.log("initAppFailure - : ");
        dispatch(initAppFailure(err));
      });
  };
};

export default {
  loginOperation,
  signupOperation,
  signoutOperation,
    cleanLoginErrorOperation,
	initAppOperation
};
