import React, { Component } from "react"
import { Pagination } from 'react-bootstrap'
import { changePage } from '../actions/api_navigation'
import { connect } from 'react-redux';

class PaginationBasic extends Component {

  handlePageChange(page) {
    this.props.changePage(this.props.searchUrl, page, this.props.per_page, {query_string: this.props.query_string});
  }

  render() {
    const { current_page, pages, count } = this.props
    return (
      <div>
        <Pagination
          bsSize="medium"
          prev
          next
          first
          last
          items={ pages }
          activePage={ current_page }
          maxButtons={10}
          onSelect={ this.handlePageChange.bind(this) } />
        <div>{ this.props.count }</div>
      </div>
    );
  }
}

const mapStateToProps = ({ ticketsReducer }) => {
  const { current_page, count, per_page, query_string } = ticketsReducer;
  const pages = Math.ceil(count / per_page);
  return { current_page, pages, per_page, count, query_string };
};

export default connect(mapStateToProps, {changePage})(PaginationBasic);
