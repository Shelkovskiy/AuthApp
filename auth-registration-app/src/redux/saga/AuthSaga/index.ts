import { IAuthResponseLoginData } from "./../../types/authTypes/index";
import { all, takeLatest, put, call } from "redux-saga/effects";
import { LOGIN } from "../../action/actions";
import { authActionCreators } from "./../../action/authActionCreators/index";
import axios, { AxiosResponse } from "axios";
import { login } from "../../../services/authServices";

function* fetchLogin({
	payload: { email, password },
}: ReturnType<typeof authActionCreators.getLogin>) {
	try {
		yield put(authActionCreators.setAuthLoading(true));
		const response: AxiosResponse<IAuthResponseLoginData> = yield call(login, {
			email,
			password,
		});
		if (response.data && response.status === 200) {
			yield put(
				authActionCreators.getLoginDataSuccess({
					...response.data,
					email: email,
				}),
			);
		}
	} catch (e: any) {
		console.log({ e });
		yield put(
			authActionCreators.getLoginDataFailure(e?.response?.data?.detail),
		);
	} finally {
		yield put(authActionCreators.setAuthLoading(false));
	}
}

export function* authSaga() {
	yield all([takeLatest(LOGIN, fetchLogin)]);
}
