import { combineReducers } from 'redux';
import TicketsReducer from './tickets_reducer';
import FormTicketReducer from './form_ticket_reducer';
import FormUserReducer from './form_user_reducer';

export default combineReducers({
  ticketsReducer: TicketsReducer,
  formTicketReducer: FormTicketReducer,
  formUserReducer: FormUserReducer
});
