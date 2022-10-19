import React, { useCallback, useEffect, useMemo, useState } from "react";
import Input from "../../components/Input/index";
import Button from "../../components/Button/index";
import Loader from "../../components/Loader/Loader";
import { Form } from "../../components/Form";
import { FormLabel } from "../../components/Form";
import Text from "../../components/Text";
import ComponentsContainer from "../../components/Container";
import { CustomLnk } from "../../components/CustomLink";
import { authActionCreators } from "../../redux/action/authActionCreators";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	dataSelectors,
	errorAuthSelector,
	isAuthSelector,
	isLoadingAuthSelector,
} from "../../redux/selectors";

export interface IData {
	email: string;
	password: string;
}

export interface ILoginFormProps {
	isLoading: boolean;
}

const prevUserData: IData = { email: "", password: "" };

const LoginFormPage = () => {
	const [loginForm, setLoginForm] = useState(prevUserData);
	// const [emailDirty, setEmailDirty] = useState(false);
	// const [passwordDiry, setPasswordDirty] = useState(false);
	// const [emailError, setEmailError] = useState("Email не может быть пустым");
	// const [passwordError, setPasswordError] = useState(
	// 	"Password не может быть пустым",
	// );
	// const [formValid, setFormValid] = useState(false);

	const dispatch = useAppDispatch();
	const errorMessage = useAppSelector(errorAuthSelector);
	const isAuthLoading = useAppSelector(isLoadingAuthSelector);
	const data = useAppSelector(dataSelectors);
	const isAuth = useAppSelector(isAuthSelector);
	console.log({ data });

	const onUserDataChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setLoginForm((prevState) => ({
				...prevState,
				[e.target.id]: e.target.value,
			}));
			// const reEmail = /^\S+@\S+\.\S+$/;
			// if (!reEmail.test(String(loginForm.email).toLowerCase())) {
			// 	setEmailError("Некорректный email");
			// 	if (!e.target.value) {
			// 		setEmailError("Email не может быть пустым");
			// 	}
			// } else {
			// 	setEmailError("");
			// }
			// if (loginForm.password.length < 3 || loginForm.password.length > 30) {
			// 	setPasswordError(
			// 		" Пароль не должен быть короче 3 и больше 20 символов",
			// 	);
			// 	if (!e.target.value) {
			// 		setPasswordError("Пароль не может быть пустым");
			// 	}
			// } else {
			// 	setPasswordError("");
			// }
		},
		[],
	);

	// const blurHandler = (e: any) => {
	// 	switch (e.target.name) {
	// 		case "email":
	// 			setEmailDirty(true);
	// 			break;
	// 		case "password":
	// 			setPasswordDirty(true);
	// 			break;
	// 	}
	// };

	const onLoginFormSubmit = useCallback(
		() =>
			dispatch(
				authActionCreators.getLogin({
					email: loginForm.email,
					password: loginForm.password,
				}),
			),
		[dispatch, loginForm.email, loginForm.password],
	);

	// const isButtonDisabled = useMemo(() => {
	// 	const formValues = Object.values(loginForm);
	// 	return !(formValues.filter((item) => !!item).length === formValues.length);
	// }, [loginForm]);

	// useEffect(() => {
	// 	if (emailError && passwordError) {
	// 		setFormValid(false);
	// 	} else {
	// 		setFormValid(true);
	// 	}
	// }, [emailError, passwordError]);

	return (
		<ComponentsContainer>
			<ComponentsContainer width="400px" margin="10px auto 100px">
				<Text maxwidth="624" fontWeigth="600" color="#313037">
					Welcome to the Login Page
				</Text>
			</ComponentsContainer>
			{errorMessage && (
				<Text margin="auto" width="600" color="red">
					{errorMessage}
				</Text>
			)}
			{!isAuthLoading ? (
				<>
					<Form maxwidth="624" maxheigth="1000" margin="auto" padding="40">
						<Text margin="0 auto 20px" color="#313037">
							Login
						</Text>
						<FormLabel htmlFor="email">
							E-mail
							<Input
								// onBlur={(e) => blurHandler(e)}
								placeholder="E-mail"
								className="input"
								type="text"
								name="email"
								value={loginForm.email}
								onChange={onUserDataChange}
								fieldName="email"
							/>
							{/* {emailDirty && emailError && (
								<Text fontSize="14px" color="red">
									{emailError}
								</Text>
							)} */}
						</FormLabel>
						<FormLabel htmlFor="password">
							Password
							<Input
								// onBlur={(e) => blurHandler(e)}
								placeholder="Password"
								className="input"
								type="password"
								name="password"
								value={loginForm.password}
								onChange={onUserDataChange}
								fieldName="password"
							/>
							{/* {passwordDiry && passwordError && (
								<Text fontSize="14px" color="red">
									{passwordError}
								</Text>
							)} */}
						</FormLabel>
						<CustomLnk to="/homepage">
							<Button
								background="lightblue"
								margin="auto"
								// disabled={!formValid}
								type="button"
								onClick={onLoginFormSubmit}
							>
								Login
							</Button>
						</CustomLnk>

						<ComponentsContainer display="flex">
							<Button margin="auto" color="black" background="lightgray">
								Forgot password?
							</Button>
							<Button margin="auto" width="140" background="lightgray">
								Need an account?
							</Button>
						</ComponentsContainer>
						<CustomLnk textDecoration="underline" to="/signupformpage">
							<Button margin="auto" background="lightgray" width="4vw">
								Sign Up
							</Button>
						</CustomLnk>
					</Form>
				</>
			) : (
				<Loader />
			)}
		</ComponentsContainer>
	);
};

export default LoginFormPage;
