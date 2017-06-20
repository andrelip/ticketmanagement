import { renderComponent, expect } from '../test_helper';
import formUserReducer from 'approot/react/reducers/form_user_reducer';
const INITIAL_STATE = { edited_password: '', edited_name: '', edited_email: '',
                        edited_is_staff: '', errors: [] };

describe('formUserReducer', () => {

  describe('action change_user_field', () => {
    it('should update a edition field', () => {
      const action = { type: 'change_user_field', payload: { field: 'name', value: 'David' } }
      const new_state = formUserReducer(INITIAL_STATE, action);
      expect(new_state.edited_name).to.eq("David");
      expect(new_state).to.not.eq(INITIAL_STATE);
    });
  });

  describe('action update_errors', () => {
    it('should change the errors array', () => {
      const action = { type: 'update_errors', payload: ["Error message"] };
      const new_state = formUserReducer(INITIAL_STATE, action);
      expect(new_state.errors).to.include("Error message");
      expect(new_state).to.not.eq(INITIAL_STATE);
    });
  });

  describe('action clean_user_form', () => {
    it('should clean items', () => {
      const FULL_STATE = { edited_password: 'data', edited_name: 'data', edited_email: 'data',
                              edited_is_staff: 'data', errors: ["error"] };
      const action = { type: 'clean_user_form', payload: null };
      const new_state = formUserReducer(FULL_STATE, action);
      expect(new_state).to.eql(INITIAL_STATE);
    });

    it('should clean items', () => {
      const action = { type: 'clean_user_form', payload: null };
      const new_state = formUserReducer(INITIAL_STATE, action);
      expect(new_state).to.eql(INITIAL_STATE);
    });
  });

});
