import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from 'connected-react-router';
import getRoutes from './app/routes/routes';
import { createBrowserHistory } from 'history';
import { Provider } from "react-redux";
import configureStore from './app/store/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './index.css';
import { LocalizeProvider } from "react-localize-redux";

const history = createBrowserHistory();
const store = configureStore(history);
const routes = getRoutes();

const App = props => (
  <LocalizeProvider>
    <Provider store={store}> 
        <ConnectedRouter history={history}>
          {routes}
        </ConnectedRouter>
    </Provider>
  </LocalizeProvider>
);


ReactDOM.render(<App />, document.getElementById("root"));

