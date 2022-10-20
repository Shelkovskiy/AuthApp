import {
	GET_LOGIN_DATA_SUCCESS,
	GET_LOGIT_DATA_FAILURE,
	AUTH_LOADING,
} from "./../../action/actions";
import { Reducer } from "redux";
import { AuthActionType } from "../../action/authActionCreators";

interface IInitialAuthState {
	data: { accessToken: string; refreshToken: string; email: string } | {};
	isLoading: boolean;
	error: null | string;
	isAuth: boolean;
}

const initialState: IInitialAuthState = {
	data: {},
	isLoading: false,
	error: null,
	isAuth: false,
};

const authReducer: Reducer<IInitialAuthState, AuthActionType> = (
	state = initialState,
	action,
) => {
	switch (action.type) {
		case GET_LOGIN_DATA_SUCCESS:
			return {
				...state,
				data: { ...action.payload },
				error: null,
				isAuth: true,
			};
		case GET_LOGIT_DATA_FAILURE:
			return {
				...state,
				error: action.payload,
			};
		case AUTH_LOADING:
			return {
				...state,
				isLoading: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
