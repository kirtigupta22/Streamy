import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import reducers from './reducers';

//const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxThunk))
    );

ReactDOM.render(
    <Provider store={store} >
        <App />
    </Provider>,
    document.querySelector('#root')
 );