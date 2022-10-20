import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ComponentsContainer from "../../components/Container";
import { IAuthResponseActivation } from "../../redux/types/authTypes";
import { accountActivation } from "../../services/authServices";
import Text from "../../components/Text";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button";
import { CustomLnk } from "../../components/CustomLink";

const ActivationPage = () => {
	const { uid, id } = useParams();
	const [isActivated, setIsActivated] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (uid && id) {
			const activateAccount = async () => {
				try {
					setIsLoading(true);
					const response = await accountActivation({ uid, token: id });
					if (response.data) {
						setIsActivated(true);
					}
				} catch (e: any) {
					setErrorMessage(e?.response?.data?.detail as string);
				} finally {
					setIsLoading(false);
				}
			};
			activateAccount();
		}
	}, [uid, id]);

	return (
		<ComponentsContainer>
			<ComponentsContainer width="500px" margin="10px auto 100px">
				<Text maxwidth="624" fontWeigth="600" color="#313037">
					Your account is succesfully activated!
				</Text>
				<CustomLnk to="/loginFormPage">
					<Button background="lightblue">Go to the login page</Button>
				</CustomLnk>
			</ComponentsContainer>
			<>
				{isActivated ? (
					<>
						<Text>Please check email to verify your account</Text>
						<CustomLnk to="/loginFormPage">
							<Button>Go to login page</Button>
						</CustomLnk>
					</>
				) : (
					<>
						{!isLoading ? (
							<>
								{errorMessage && (
									<Text margin="auto" width="600" color="red">
										{errorMessage}
									</Text>
								)}
								<Text width="600" margin="auto">
									Activation Page
								</Text>
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

export default ActivationPage;
