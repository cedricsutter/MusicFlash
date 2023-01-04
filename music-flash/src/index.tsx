import React from 'react';
import Application from './application';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {reducer} from "./store/reducer";
import {BlogAction, DispatchType, BlogState} from "./interfaces/types";

const container = document.getElementById('root');
const root = createRoot(container!);
const store: Store<BlogState, BlogAction> & {
    dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))


root.render(

        <BrowserRouter>
            <Provider store={store}>
                <Application />
            </Provider>
        </BrowserRouter>

);

reportWebVitals();
