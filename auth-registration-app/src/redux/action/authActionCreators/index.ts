import { GET_LOGIT_DATA_FAILURE } from "./../actions";
import { InferActionTypes } from "../../store";
import { IAuthRequestLoginData } from "../../types/authTypes";
import { AUTH_LOADING, LOGIN, GET_LOGIN_DATA_SUCCESS } from "../actions";

export const authActionCreators = {
	//  redux-saga
	getLogin: (loginData: IAuthRequestLoginData) => {
		return {
			type: LOGIN,
			payload: loginData,
		};
	},
	// reducers
	setAuthLoading: (isLoading: boolean) => {
		return {
			type: AUTH_LOADING,
			payload: isLoading,
		};
	},
	getLoginDataSuccess: (data: {
		accessToken: string;
		refreshToken: string;
		email: string;
	}) => {
		return {
			type: GET_LOGIN_DATA_SUCCESS,
			payload: data,
		};
	},
	getLoginDataFailure: (error: any) => {
		return {
			type: GET_LOGIT_DATA_FAILURE,
			payload: error,
		};
	},
};

export type AuthActionType = InferActionTypes<typeof authActionCreators>;
