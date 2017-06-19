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
    case 'change_user_activation':
      const { userId, disabled }  = action.payload;
      const user_items = _.cloneDeep(state.search_items);
      const other_items = _.filter(user_items, (item) => {
        return item.id != userId;
      });
      const item = _.find(user_items, (item) => {
        return item.id == userId;
      });
      item.disabled = disabled;
      return { ...state, search_items: [...other_items, item] };
    case 'item_deleted':
      return { ...state, search_items: state.search_items.filter(item => item.id !== action.payload), count: (state.count - 1) };
    default:
      return state;
  }
};
