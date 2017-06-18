import { combineReducers } from 'redux';
import TicketsReducer from './tickets_reducer';
import NotifyReducer from './notify_reducer';
import formTicketReducer from './form_ticket_reducer';

export default combineReducers({
  ticketsReducer: TicketsReducer,
  notifyReducer: NotifyReducer,
  formTicketReducer: formTicketReducer
});
