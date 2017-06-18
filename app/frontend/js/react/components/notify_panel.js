import React, { Component } from "react"
import { changeSearchString } from '../actions/api_navigation'
import { connect } from 'react-redux';
import { _ } from 'lodash';
import { Alert } from 'react-bootstrap'

class NotifyPanel extends Component {
  render() {
    return (
      < Alert bsStyle="success" className="notify-panel">
        {this.props.notify_message}
      </Alert>
    )
  }

  handleQueryInputChange(e) {
    const { current_page, per_page } = this.props
    this.props.changePage( current_page, per_page, {query_string: e.target.value} );
  }
}

const mapStateToProps = ({ notifyReducer }) => {
  const { notify_message } = notifyReducer;
  return { notify_message };
};

export default connect(mapStateToProps)(NotifyPanel);
