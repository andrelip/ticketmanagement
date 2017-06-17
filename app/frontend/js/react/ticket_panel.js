import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import reducers from './reducers';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class App extends Component {
  render() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducers, {}, composeEnhancers(
      applyMiddleware(ReduxThunk)
    ));

    return (
      <Provider store={store}>
        <Router>
          <div>
            <ul className="top_navigation">
              <li><Link to="/ticket_panel">Global</Link></li>
              <li><Link to="/ticket_panel/closed">Comentários</Link></li>
            </ul>

            <hr/>
            <switch>
              <Route exact path="/ticket/panel" component={ GlobalSearchView }/>
              <Route path="/ticket/panel/:scope" component={ GlobalSearchView }/>
            </switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const GlobalSearchView = ({match}) => {
  let url;
  let showBar = true;
  switch(match.url) {
    case "/ticket_panel":
      url = "/api/v1/tickets";
      break;
    case "/ticket_panel/closed":
      url = "/api/v1/tickets";
      break;
    default:
      url = "/api/v1/tickets";
  }

  return (
    <div>
      <div className="content_general">
        <GlobalSearch searchUrl={ url } key={ url } showBar={ showBar } />
      </div>

      <div className="navBar">
        <ul className="baseNav">
          <BookDescription />
        </ul>
      </div>
    </div>)
};

const renderApp = () => {
  ReactDOM.render(
    <App />,
    document.getElementById("app")
  )
};

export default renderApp;
