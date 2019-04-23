import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../modules";
import thunk from "redux-thunk";
import io from "socket.io-client";
import socketMiddleWare from "./socket";
const socket =  
  process.env.NODE_ENV === 'development' 
  ? io("http://localhost:8080")
  : io("https://dotogether1.herokuapp.com")

const isDev = 
  process.env.NODE_ENV === 'development' 
  ? true
  : false

const devTools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools || compose;

const middlewares = [thunk, socketMiddleWare(socket)
];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export {
  store
};
