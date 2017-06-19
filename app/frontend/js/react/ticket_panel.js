import React, { Component } from "react";
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import ReactDOM from "react-dom";
import ListItems from "./components/list_items";
import TicketForm from "./components/ticket_form";
import UserForm from "./components/user_form";
import reducers from './reducers';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


class App extends Component {

  renderForAdmin() {
    if (gon.jwt.can_manage_users == true) {
      return (
        <span>
          <li><Link to="/user_panel/list">List Users</Link></li>
          <li><Link to="/user_panel/new/new_user">New User</Link></li>
        </span>
      )
    }
  }

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
              <li><Link to="/ticket_panel/list/open_tickets">Open Tickets</Link></li>
              <li><Link to="/ticket_panel/list/closed">Closed Tickets</Link></li>
              <li><Link to="/ticket_panel/new/new_ticket">New Ticket</Link></li>
              { this.renderForAdmin() }
              <li><a rel="nofollow" data-method="delete" href="/users/sign_out">Sign Out</a></li>
            </ul>

            <hr/>
            <switch>
              <Route exact path="/" component={ ListItemsView }/>
              <Route path="/ticket_panel/list/:scope" component={ ListItemsView }/>
              <Route path="/ticket_panel/new/:scope" component={ TicketForm }/>
              <Route exact path="/user_panel/new/new_user" component={ UserForm }/>
              <Route path="/user_panel/list" component={ ListItemsView }/>
            </switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const ListItemsView = ({match}) => {
  let url;
  let resource_type;
  let showBar = true;
  switch(match.url) {
    case "/ticket_panel/list/open_tickets":
      url = "/api/v1/tickets/list?status=open";
      resource_type = 'ticket';
      break;
    case "/ticket_panel/list/closed":
      url = "/api/v1/tickets/list?status=closed";
      resource_type = 'ticket';
      break;
    case "/user_panel/list":
      url = "/api/v1/users/list";
      resource_type = 'user';
      break;
    default:
      url = "/api/v1/tickets/list?status=open";
      resource_type = 'ticket';
  }

  return (
    <div>
      <div className="content_general">
        <ListItems searchUrl={ url } key={ url } resource_type={ resource_type } showBar={ showBar } />
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
