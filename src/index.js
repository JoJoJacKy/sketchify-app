import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Redux Boilerplate
import { Provider } from "react-redux"; // Keep tracks of store (Global State)
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// Our Combined Reducers
import reducers from "./reducers/index"; // Default exports is imported as reducers

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
