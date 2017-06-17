import _ from 'lodash';

const INITIAL_STATE = { search_items: [],
  current_page: 1,
  count: 0,
  per_page: 10,
  pages: 1,
  query_string: null,
  notify_message: ''};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'changed_page':
      const { items, current_page, count, query_string }  = action.payload;
      const final_current_page = (query_string === state.query_string) ? current_page : 1;
      return { ...state, search_items: items,
        current_page: final_current_page,
        count: count,
        query_string: query_string};
    case 'item_deleted':
      return { ...state, search_items: state.search_items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};
