import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginFormPage from "./pages/LoginFormPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpFormPage from "./pages/SignUpPage";
import ActivationPage from "./pages/ActivationPage";
import HomePage from "./pages/HomePage";

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate replace to="/loginFormPage" />} />
			<Route path="/loginFormPage" element={<LoginFormPage />} />
			<Route path="/homepage" element={<HomePage />} />
			<Route path="/activate/:uid/:id" element={<ActivationPage />} />
			<Route path="/signupformpage" element={<SignUpFormPage />} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};

export default App;
