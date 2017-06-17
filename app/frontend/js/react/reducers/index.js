import { combineReducers } from 'redux';
import TicketsReducer from './tickets_reducer';
// import NotifyReducer from './NotifyReducer';

export default combineReducers({
  ticketsReducer: TicketsReducer
  // notifyReducer: NotifyReducer,
});
