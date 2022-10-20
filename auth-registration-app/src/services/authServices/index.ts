import {IAuthResponseRegistrationData,
	IAuthRequestLoginData,
	IAuthResponseLoginData,
	IAuthRequestRegistrationData,
	IAuthRequestActivation,
	IAuthResponseActivation,
} from "./../../redux/types/authTypes/index";
import axios from "axios";
import { BASE_API } from "../../api";

export const login = async ({ email, password }: IAuthRequestLoginData) => {
	return await axios.post<IAuthResponseLoginData>(
		`${BASE_API}/auth/jwt/create`,
		{
			email,
			password,
		},
	);
};

export const registration = async ({
	username,
	email,
	password,
}: IAuthRequestRegistrationData) => {
	return await axios.post<IAuthResponseRegistrationData>(
		`${BASE_API}/auth/users/`,
		{ username, email, password },
	);
};

export const accountActivation = async ({
	uid,
	token,
}: IAuthRequestActivation) => {
	return axios.post<IAuthResponseActivation>(
		`${BASE_API}/auth/users/activation/`,
		{ uid, token },
	);
};
