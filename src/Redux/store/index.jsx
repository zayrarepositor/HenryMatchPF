import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import thunk from "redux-thunk";
import rootReducer from "../reducer";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//REDUX DEPENCIES INSTALLATION (ZAY)
//npm install redux react-redux //npm install axios
//npm install --save-dev redux-devtools
//npm i @redux-devtools/extension redux-thunk
