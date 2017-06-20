import { renderComponent, expect } from '../test_helper';
import ticketsReducer from 'approot/react/reducers/tickets_reducer';
const INITIAL_STATE = { search_items: [],
                        current_page: 1,
                        count: 0,
                        per_page: 10,
                        pages: 1,
                        query_string: null,
                        notify_message: '' };

describe('ticketsReducer', () => {

  describe('action item_deleted', () => {
    it('should delete a item from search_items', () => {
      const state = { INITIAL_STATE, search_items: [{ id: 1, name: "user1" }, { id: 2, name: "user_to_be_deleted" }] };
      const action = { type: 'item_deleted', payload: 2 };
      const new_state = ticketsReducer(state, action);
      expect(new_state).to.not.eql(state);
      expect(new_state.search_items).to.contain({ id: 1, name: "user1" });
      expect(new_state.search_items).to.not.contain({ id: 2, name: "user_to_be_deleted" });
    });
  });

  describe('action changed_page', () => {
    it('should match api response', () => {
      const payload = {items: [{id: 1}, {id: 2}], current_page: 1, count: 1, query_string: "test"}
      const action = { type: 'changed_page', payload: payload };
      const new_state = ticketsReducer(INITIAL_STATE, action);
      expect(new_state).to.not.eql(INITIAL_STATE);
      expect(new_state.search_items).to.contain({ id: 1 });
      expect(new_state.current_page).to.eq(1);
      expect(new_state.count).to.eq(1);
      expect(new_state.query_string).to.eq('test');
    });
  });

  describe('action change_user_activation', () => {
    it('should disable a user', () => {
      const state = { INITIAL_STATE, search_items: [{ id: 1, disabled: false }] };
      const action = { type: 'change_user_activation', payload: { userId: 1, disabled: true } };
      const new_state = ticketsReducer(state, action);
      expect(new_state).to.not.eql(state); // for immutability
      expect(new_state.search_items).to.contain({ id: 1, disabled: true });
    });

    it('should disable a user', () => {
      const state = { INITIAL_STATE, search_items: [{ id: 1, disabled: true }] };
      const action = { type: 'change_user_activation', payload: { userId: 1, disabled: false } };
      const new_state = ticketsReducer(state, action);
      expect(new_state).to.not.eql(state); // for immutability
      expect(new_state.search_items).to.contain({ id: 1, disabled: false });
    });
  });
});
