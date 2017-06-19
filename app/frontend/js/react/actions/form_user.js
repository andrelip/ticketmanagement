import axios from 'axios'

export const onChangeField = (field, value) => {
  return {type: 'change_field', payload: {field: field, value: value}}
};

export const createTicket = (create_params) => {
  return (dispatch) => {
    axios.defaults.headers.common['Authorization'] = gon.jwt.auth_token;
    axios.post('/api/v1/tickets/create', create_params)
      .then(function (response) {
        const { data } = response.data;
        dispatch({ type: 'clean_ticket_form', payload: null });
        dispatch({type: 'new_notification_message', payload: `${slug} atualizado`})
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const changeDisabled = (userId, disabled) => {
  return (dispatch) => {
    axios.defaults.headers.common['Authorization'] = gon.jwt.auth_token;
    axios.patch('/api/v1/user/update', { user_id: ticketId, disabled: disabled,
      staff: gon.jwt.is_staff})
      .then(function (response) {
        dispatch({ type: 'change_user_activation', payload: { userId, disabled } });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const activateUser = (userID) => {
  return changeDisabled(userId, false)
};
export const desativateUser = (userID) => {
  return changeDisabled(userId, true)
};