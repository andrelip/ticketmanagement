import React, { Component } from "react"
import { Panel, Button, Col, Row, Image, Label } from 'react-bootstrap'
import { connect } from 'react-redux';
import { activateUser, desativateUser } from '../actions/form_user';
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
            { (id != gon.user_id) ? this.renderButton(disabled) : null }
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

  handleButton(isToDisable) {
    const { activateUser, desativateUser, item } = this.props;
    if (isToDisable) {
      desativateUser(item.id)
    } else {
      activateUser(item.id)
    }
  }

  renderButton(disabled) {
    if (disabled == true) {
      return <Button bsStyle="primary" className="button" onClick={ this.handleButton.bind(this, false)} >✓ Enable</Button>
    } else {
      return <Button bsStyle="danger" className="button" onClick={ this.handleButton.bind(this, true)} > Disable </Button>
    }
  }
}

export default connect(null, { activateUser, desativateUser })(User);
