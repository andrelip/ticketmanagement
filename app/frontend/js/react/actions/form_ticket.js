import axios from 'axios'

export const onChangeField = (field, value) => {
  return {type: 'change_field', payload: {field: field, value: value}}
};

export const createTicket = (create_params) => {
  return (dispatch) => {
    axios.post('/api/v1/create', {
      ticket: create_params
    })
   .then(function (response) {
     const { data } = response.data;
     dispatch({ type: 'select_book', payload: '' });
     dispatch({ type: 'books_changed', payload: {slug: slug, data: data} });
     dispatch({type: 'new_notification_message', payload: `${slug} atualizado`})
   })
   .catch(function (error) {
     console.log(error);
   });
  };
};
