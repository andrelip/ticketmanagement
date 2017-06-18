import React, { Component } from "react"
import { changeSearchString } from '../actions/api_navigation'
import { changePage, deleteItem } from '../actions/api_navigation'
import { connect } from 'react-redux';
import { _ } from 'lodash';

class SearchInput extends Component {
  render() {
    return (
      <input
        type="text"
        onChange={ this.handleQueryInputChange.bind(this) }
        className={"form-control search-input"}
        placeholder="Search for ticket" />
    )
  }

  handleQueryInputChange(e) {
    const { current_page, per_page } = this.props;
    this.props.changePage( this.props.searchUrl, current_page, per_page, {query_string: e.target.value} );
  }
}

const mapStateToProps = ({ ticketsReducer }) => {
  const { current_page, per_page, query_string, search_items } = ticketsReducer;
  return { current_page, per_page, query_string, search_items };
};

export default connect(mapStateToProps, { changePage, deleteItem })(SearchInput);
