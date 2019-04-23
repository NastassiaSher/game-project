// operations.js
import {Creators} from "./actions";

const submitGameRequest = Creators.submitGameRequest;
const submitGameSuccess = Creators.submitGameSuccess;
const submitGameFailure = Creators.submitGameFailure;

const initGameRequest = Creators.initGameRequest;
const initGameSuccess = Creators.initGameSuccess;
const initGameFailure = Creators.initGameFailure;

const updateGameRequest = Creators.updateGameRequest;
const updateGameSuccess = Creators.updateGameSuccess;
const updateGameFailure = Creators.updateGameFailure;

const acceptGameRequest = Creators.acceptGameRequest;
const acceptGameSuccess = Creators.acceptGameSuccess;
const acceptGameFailure = Creators.acceptGameFailure;

const endGameRequest = Creators.endGameRequest;
const endGameSuccess = Creators.endGameSuccess;
const endGameFailure = Creators.endGameFailure;


const submitGameOperation = submitGameData => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        dispatch(submitGameRequest());
        const firestore = getFirestore();
        const history = submitGameData.history;
        delete submitGameData.history;
        firestore
            .collection("games")
            .add({
                ...submitGameData,
                status: "open"
            })
            .then(submitGameResponse => {
                dispatch(submitGameSuccess(submitGameResponse));
                history.push("/app");
            })
            .catch(submitGameError => {
                dispatch(submitGameFailure(submitGameError));
            });
    };
};


const initGameOperation = (history) => initGameData => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {

			dispatch(initGameRequest(initGameRequest));
			const userId = getState().auth.userId
			const firestore = getFirestore(); 
			let gameId;
			let initGameRes;
			const random = Math.floor(Math.random(2) * Math.floor(100))
			firestore
					.collection("games")
					.add({
							gameStatus: "init",
							gameSteps: [{'who': userId, number: random, selected: random, firstStep: true, result: random}],
							acceptorId: '',
							gameResult: random,
							initiatorId: userId,
							acceptorSteps: [],
							currentNumber: random
					})
					.then(initGameResponse => {
						initGameRes = initGameResponse;
						gameId = initGameResponse.id;
							return firestore
							.collection("users")
							.doc(userId)
							.update({
								gameId
							});
					}).
					then(() => {
						dispatch(initGameSuccess(initGameRes));
						history.push(`/game/${gameId}`);
					})
					.catch(initGameError => {
							dispatch(initGameFailure(initGameError));
					});
	};
};

const acceptGameOperation = (history) => gameId => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
			dispatch(acceptGameRequest());
			const userId = getState().auth.userId
			const firestore = getFirestore(); 
			firestore
					.collection("games")
					.doc(gameId)
					.update({
						acceptorId: userId,
					})
					.then(() => {
						return firestore
						.collection("users")
						.doc(userId)
						.update({
							gameId
						});
					})
					.then(() => {
						dispatch(acceptGameSuccess());
						history.push(`/game/${gameId}`);
					})
					.catch(acceptGameError => {
							dispatch(acceptGameFailure(acceptGameError));
					});
	};
};

const updateGameOperation = selected => data => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
			dispatch(updateGameRequest(initGameRequest));
			const userId = getState().auth.userId;
			const gameId = getState().gameManageReducer.gameId;
			const newResult = (selected + data.number)/3;
			const number = data.number;
			const firestore = getFirestore();
			const firebase = getFirebase();
			firestore
					.collection("games")
					.doc(data.gameId)
					.update({
						gameStatus: 'playing',
						userId: userId,
						gameResult: newResult,
						currentNumber: number,
						gameSteps :firebase.firestore.FieldValue.arrayUnion({'who': userId, selected, number, result: newResult})
					})
					.then(updateGameResponse => {
							dispatch(updateGameSuccess(updateGameResponse));
					})
					.catch(updateGameError => {
							dispatch(updateGameFailure(updateGameError));
					});
	};
};


const endGameOperation = history => data => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
			dispatch(endGameRequest(endGameRequest));
			const firestore = getFirestore();
			firestore
					.collection("users")
					.doc(data.initiatorId)
					.update({
						gameId: null,
						gameStatus: null
					})
					.then(() => {
						return firestore
						.collection("users")
						.doc(data.acceptorId)
						.update({
							gameId: null,
							gameStatus: null
						})

					})
					.then(() => {
						dispatch(endGameSuccess());
						history.push("/main");

					})
					.catch(endGameError => {
							dispatch(endGameFailure(endGameError));
					});
	};
};



export default {
		submitGameOperation,
		initGameOperation,
		updateGameOperation,
		acceptGameOperation,
		endGameOperation
};
