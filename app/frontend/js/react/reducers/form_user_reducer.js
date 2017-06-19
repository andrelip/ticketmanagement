const INITIAL_STATE = { edited_password: '', edited_name: '', edited_email: '', edited_is_staff: ''};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'change_user_field':
      const { field, value } = action.payload;
      const new_state =  { ...state, ["edited_" + field]: value};
      return new_state;
    case 'clean_user_form':
      return INITIAL_STATE;
    default:
      return state;
  }
};
