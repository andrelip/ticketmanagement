const INITIAL_STATE = { edited_message: '', edited_name: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'change_field':
      const { field, value } = action.payload;
      const new_state =  { ...state, ["edited_" + field]: value};
      return new_state;
    case 'clean_ticket_form':
      return INITIAL_STATE;
    default:
      return state;
  }
};
