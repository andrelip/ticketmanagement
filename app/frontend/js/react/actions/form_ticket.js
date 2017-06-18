import axios from 'axios'

export const onChangeField = (field, value) => {
  return {type: 'change_field', payload: {field: field, value: value}}
};

export const createTicket = (create_params) => {
  return (dispatch) => {
    axios.defaults.headers.common['Authorization'] = gon.jwt.auth_token;
    axios.post('/api/v1/create', create_params)
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
