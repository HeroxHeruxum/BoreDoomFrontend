import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import {Provider} from "react-redux";
import store from "./store/store";

axios.defaults.withCredentials = true;

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

