import React from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router/immutable';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';
import { createStructuredSelector, createSelector } from 'reselect';
import { createBrowserHistory } from 'history';
import { fromJS } from 'immutable';
import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { brown, teal } from '@material-ui/core/colors';
import { Switch, Route } from 'react-router';
import Root from './containers/Root';
import createReducer from './reducers';
import rootSaga from './sagas';
import './main.css';


const fonts = {
  en: '"Roboto", "Helvetica", "Arial", sans-serif',
  zh: '"Noto Sans SC X", "Noto Sans SC", "Microsoft YaHei", sans-serif',
};

const makeTheme = (fontFamily) => createMuiTheme({
  typography: {
    fontFamily,
  },
  palette: {
    primary: {
      light: teal[600],
      main: teal[800],
      dark: teal[900],
      contrastText: '#fff',
    },
    secondary: {
      light: brown[600],
      main: brown[800],
      dark: brown[900],
      contrastText: '#fff',
    },
  },
});

const ConnectedMuiThemeProvider = connect(createStructuredSelector({
  theme: createSelector(
    (state) => state.getIn(['language', 'locale']),
    (state) => makeTheme(fonts[state]),
  ),
}))(MuiThemeProvider);

const history = createBrowserHistory();

const saga = createSagaMiddleware();

const middlewares = [
  saga,
  routerMiddleware(history),
];

const enhancers = [
  applyMiddleware(...middlewares),
  persistState(undefined, {
    key: 'chat',
    serialize: (state) => JSON.stringify({
      jwt: state.get(['global', 'jwt']),
    }),
    deserialize: (raw) => {
      const parsed = JSON.parse(raw);
      if (!parsed) {
        return undefined;
      }
      const { jwt } = parsed;
      return fromJS({
        global: { jwt },
      });
    },
    merge: (init, states) => init.mergeDeep(states),
  }),
];

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production'
  && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ name: 'chat', trace: true })
  : compose;
/* eslint-enable no-underscore-dangle */

const init = fromJS({});

const store = createStore(
  createReducer(history),
  init,
  composeEnhancers(...enhancers),
);

saga.run(rootSaga);

render((
  <Provider store={store}>
    <CssBaseline />
    <ConnectedMuiThemeProvider>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={Root} />
          <Route path="/seminar" component={Root} />
          <Route path="/proposal" component={Root} />
        </Switch>
      </ConnectedRouter>
    </ConnectedMuiThemeProvider>
  </Provider>
), document.getElementById('app'));
