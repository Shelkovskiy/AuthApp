import { createStore, compose, applyMiddleware, PreloadedState } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "../reducers";
import { rootSaga } from "../saga";

const sagasMiddleware = createSagaMiddleware();

const composeEnhancers =
	process.env.NODE_ENV !== "production" &&
	typeof window === "object" &&
	(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

const enhancer = composeEnhancers(applyMiddleware(sagasMiddleware));
const configureStore = (preloadedState: PreloadedState<{}>) =>
	createStore(rootReducer, preloadedState, enhancer);

export const store = configureStore({});

sagasMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never;
export type InferActionTypes<
	T extends { [key: string]: (...args: any[]) => any },
> = ReturnType<PropertiesType<T>>;
