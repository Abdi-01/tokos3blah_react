import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
// redux configuration
import { Provider } from "react-redux"; // untuk menghungkan antara action, reducer dan component
// import { createStore } from "redux"; // untuk membuat global store untuk reducer
import { Reducers } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	reducer: Reducers,
	devTools: true,
});

// const storeReducer = createStore(Reducers);

ReactDOM.render(
	<Provider store={store}>
		{/* // BrwoserRouter : penghubung seluruh page yg di akomodir oleh App.js */}
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
