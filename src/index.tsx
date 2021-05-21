import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import {applyMiddleware, createStore, Store} from "redux";
import {AnswerAction, AnswerState, DispatchType} from "./misc/types";
import thunk from "redux-thunk";
import reducer from './store/reducer'
import {Provider} from "react-redux";

axios.defaults.withCredentials = true;
export const store: Store<AnswerState, AnswerAction> & {
    dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))

const rootElement = document.getElementById("root")
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    ,
    rootElement
);

