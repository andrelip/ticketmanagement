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
              <li><Link to="/ticket/panel">Global</Link></li>
              <li><Link to="/ticket/panel/tickets">Comentários</Link></li>
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
  console.log(match.url);
  switch(match.url) {
    case "/ticket/panel":
      url = "/api/v1/models/annotations";
      break;
    case "/ticket/panel/comentarios":
      url = "/api/v1/models/annotations?only_annotations=true";
      break;
    case "/ticket/panel/livros":
      url = "/api/v1/models/annotations?only_books=true";
      break;
    case "/ticket/panel/livros_pendentes":
      url = "/api/v1/books";
      showBar = false;
      break;
    case "/ticket/panel/livros_conferidos":
      showBar = false;
      url = "/api/v1/books?only_verified=true";
      break;
    default:
      url = "/api/v1/books";
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
