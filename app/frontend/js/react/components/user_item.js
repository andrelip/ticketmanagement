import React, { Component } from "react"
import { Panel, Button, Col, Row, Image, Label } from 'react-bootstrap'
import { connect } from 'react-redux';
import { changeStatus } from '../actions/form_ticket';
import _ from 'lodash'

class User extends Component {
  render() {
    const { name, message, status, id, user_name, user_email, disabled } = this.props.item;
    return (
      <Panel className={ this.renderClassName(status) }>
        <Row>

          <Col xs={9}>
            <h3> { name} </h3>

            <p>{ status }</p>
            <p>{ disabled ? "disabled" : "enabled"  }</p>
            <p><Label>{ id }</Label> { user_name } { `<${user_email}>`} </p>

          </Col>

          <Col xs={2}>
            { this.renderButton(status) }
          </Col>
        </Row>
      </Panel>
    );
  }

  renderClassName(status) {
    if (status == "closed") {
      return "book selected_book"
    } else {
      return "book"
    }
  }

  handleButton(new_status) {
    const { changeStatus, item } = this.props;
    changeStatus(item.id, new_status)
  }

  renderButton(status) {
    if (status == "open") {
      return <Button bsStyle="success" className="button" onClick={ this.handleButton.bind(this, 'closed')} >✓ Close</Button>
    } else {
      return <Button bsStyle="warning" className="button" onClick={ this.handleButton.bind(this, 'open')} >Reopen</Button>
    }
  }
}

export default connect(null, { changeStatus })(User);
