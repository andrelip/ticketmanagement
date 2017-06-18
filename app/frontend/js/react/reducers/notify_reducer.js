const INITIAL_STATE = { notify_message: '' };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'new_notification_message':
      return { ...state, notify_message: action.payload};
    default:
      return state;
  }
};
