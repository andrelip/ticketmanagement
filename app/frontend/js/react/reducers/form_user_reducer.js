const INITIAL_STATE = { edited_password: '', edited_name: '', edited_email: '', edited_is_staff: '', errors: []};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'change_user_field':
      const { field, value } = action.payload;
      return  { ...state, ["edited_" + field]: value};
    case 'update_errors':
      return  { ...state, errors: action.payload};
    case 'clean_user_form':
      return INITIAL_STATE;
    default:
      return state;
  }
};
