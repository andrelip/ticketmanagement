import axios from 'axios'

export const onChangeField = (field, value) => {
  return {type: 'change_user_field', payload: {field: field, value: value}}
};

export const createUser = (create_params) => {
  return (dispatch) => {
    axios.defaults.headers.common['Authorization'] = gon.jwt.auth_token;
    axios.post('/api/v1/users/create', create_params)
      .then(function (response) {
        const { data } = response.data;
        dispatch({ type: 'clean_user_form', payload: null });
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
    axios.patch('/api/v1/users/update', { user_id: userId, disabled: disabled,
      staff: gon.jwt.is_staff})
      .then(function (response) {
        dispatch({ type: 'change_user_activation', payload: { userId, disabled } });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const activateUser = (userId) => {
  return changeDisabled(userId, false)
};
export const desativateUser = (userId) => {
  return changeDisabled(userId, true)
};
