import types from "./types";

const INITIAL_STATE = {gameData: null};
const submitGameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SUBMIT_GAME_REQUEST: {
            return {
                ...state,
                submitWishShowSpinner: true
            };
        }

        case types.SUBMIT_GAME_SUCCESS: {
            return {
                ...state,
                submitGameSucced: true,
                submitGameShowSpinner: false
            };
        }

        case types.SUBMIT_GAME_FAILURE: {
            return {
                ...state,
                submitGameShowSpinner: false,
                submitGameSucced: false
            };
				}
				
				case types.INIT_GAME_REQUEST: {
					return {
							...state
					};
			}

			case types.INIT_GAME_SUCCESS: {
				const { initGameResponse } = action;
					return {
							...state,
							gameData: initGameResponse,
							gameId: initGameResponse.id
					};
			}

			case types.INIT_GAME_FAILURE: {
					return {
							...state
					};
			}

        default:
            return state;
    }
};

export default submitGameReducer;
