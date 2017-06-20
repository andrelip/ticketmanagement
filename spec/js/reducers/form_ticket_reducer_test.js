import { renderComponent, expect } from '../test_helper';
import formTicketReducer from 'approot/react/reducers/form_ticket_reducer';
const INITIAL_STATE = { edited_message: '', edited_name: '' };


describe('formTicketReducer', () => {

  describe('action change_field', () => {
    it('should update a edition field', () => {
      const action = { type: 'change_field', payload: { field: 'name', value: 'David' } }
      const new_state = formTicketReducer(INITIAL_STATE, action);
      expect(new_state.edited_name).to.eq("David");
      expect(new_state).to.not.eq(INITIAL_STATE);
    });
  });

  describe('action clean_ticket_form', () => {
    it('should clean items', () => {
      const FULL_STATE = { edited_message: 'some data', edited_name: 'some data' };
      const action = { type: 'clean_ticket_form', payload: null };
      const new_state = formTicketReducer(FULL_STATE, action);
      expect(new_state).to.eql(INITIAL_STATE);
    });

    it('should clean items', () => {
      const action = { type: 'clean_ticket_form', payload: null };
      const new_state = formTicketReducer(INITIAL_STATE, action);
      expect(new_state).to.eql(INITIAL_STATE);
    });
  });

});
