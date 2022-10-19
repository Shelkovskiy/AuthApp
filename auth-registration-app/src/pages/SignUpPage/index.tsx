import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input/index";
import Button from "../../components/Button";
import Loader from "../../components/Loader/Loader";
import { CustomLnk } from "../../components/CustomLink";
import { Form, FormLabel } from "../../components/Form";
import Text from "../../components/Text";
import ComponentsContainer from "../../components/Container";
import { registration } from "../../services/authServices";

export interface IData {
	username: string;
	password: string;
	email: string;
}

const prevUserData: IData = {
	username: "",
	email: "",
	password: "",
};

export interface ISignUpFormProps {
	isLoading: boolean;
}

const SignUpFormPage = () => {
	const [registrationForm, setRegistrationForm] = useState<IData>(prevUserData);
	const [isRegistered, setIsRegistered] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsloading] = useState(false);

	const onRegistrationFormChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setRegistrationForm((prevState) => ({
				...prevState,
				[e.target.id]: e.target.value,
			}));
		},
		[],
	);

	const onRegistrationFormSubmit = useCallback(
		async (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			try {
				setIsloading(true);
				const response = await registration({
					username: registrationForm.username,
					email: registrationForm.email,
					password: registrationForm.password,
				});
				if (response.data) {
					setIsRegistered(true);
					setRegistrationForm(prevUserData);
				}
			} catch (e: any) {
				const [values] = Object.values(e?.response?.data).flat();
				setErrorMessage(values as string);
			} finally {
				setIsloading(false);
			}
		},
		[registrationForm],
	);

	const isButtonDisabled = useMemo(() => {
		const formValues = Object.values(registrationForm);
		return !(formValues.filter((item) => !!item).length === formValues.length);
	}, [registrationForm]);
	return (
		<ComponentsContainer>
			<ComponentsContainer width="500px" margin="10px auto 100px">
				<Text maxwidth="624" fontWeigth="600" color="#313037">
					Welcome to the Registration Page
				</Text>
			</ComponentsContainer>
			{errorMessage && (
				<Text margin="auto" width="600" color="red">
					{errorMessage}
				</Text>
			)}
			<>
				{isRegistered ? (
					<>
						<Text>Please check email to verify your account</Text>
						<CustomLnk to="/loginFormPage">
							<Button>Go to activation page</Button>
						</CustomLnk>
					</>
				) : (
					<>
						{!isLoading ? (
							<>
								<Form
									maxwidth="624"
									maxheigth="1000"
									margin="auto"
									padding="40"
								>
									<Text margin="0 auto 20px"> Sign Up</Text>
									<FormLabel htmlFor="title">
										Username
										<Input
											placeholder="username"
											type="text"
											name="username "
											value={registrationForm.username}
											onChange={onRegistrationFormChange}
											fieldName="username"
										/>
									</FormLabel>
									<FormLabel htmlFor="email" className="label">
										E-mail
										<Input
											placeholder="E-mail"
											className="input"
											type="text"
											name="email "
											value={registrationForm.email}
											onChange={onRegistrationFormChange}
											fieldName="email"
										/>
									</FormLabel>
									<FormLabel htmlFor="password" className="label">
										Password
										<Input
											placeholder="Password"
											className="input"
											type="password"
											name="password"
											value={registrationForm.password}
											onChange={onRegistrationFormChange}
											fieldName="password"
										/>
									</FormLabel>
									<Button
										background="lightblue"
										margin="auto"
										onClick={onRegistrationFormSubmit}
										type="button"
									>
										Sign Up
									</Button>
									<ComponentsContainer
										display="flex"
										margin="20px auto 0px"
										justifyContent="space-between"
									>
										<Button background="none" margin="auto">
											Already a member?
										</Button>
										<CustomLnk to="/loginFormPage" textDecoration="underline">
											<Button background="none" margin="auto">
												Login?
											</Button>
										</CustomLnk>
									</ComponentsContainer>
								</Form>
							</>
						) : (
							<Loader />
						)}
					</>
				)}
			</>
		</ComponentsContainer>
	);
};

export default SignUpFormPage;
