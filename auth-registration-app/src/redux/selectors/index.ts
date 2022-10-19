import { RootState } from "./../store/index";

export const errorAuthSelector = (state: RootState) => state.auth.error;
export const isLoadingAuthSelector = (state: RootState) => state.auth.isLoading;
export const dataSelectors = (state: RootState) => state.auth.data;
export const isAuthSelector = (state: RootState) => state.auth.isAuth;
