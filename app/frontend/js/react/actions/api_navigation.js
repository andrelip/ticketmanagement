import axios from 'axios';

export const changePage = (api_url, page_number, per_page, options = {}) => {
  page_number = page_number || 1;
  const start = page_number;
  const query_string = options.query_string || null;
  return (dispatch) => {
    axios.defaults.headers.common['Authorization'] = gon.jwt.auth_token;
    axios.get(api_url, {
      params: { page: start,
                per_page: per_page,
                query_string: query_string,
                staff: gon.jwt.is_staff }
    })
      .then(function (response) {
        const { data, count } = response.data;
        dispatch({ type: 'changed_page', payload: { items: data,
          current_page: page_number,
          count: count,
          query_string: query_string} });
      })
      .catch(function (error) {
        console.log(error);
        console.log(error);
      });
  }
};

export const deleteItem = (item_id) => {
  return (dispatch) => {
    axios({
      method: 'delete',
      url: `/api/v1/tickets/models/annotations/${item_id}`
    })
      .then(function (response) {
        const { data, count } = response.data;
        dispatch({ type: 'item_deleted', payload: item_id });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
