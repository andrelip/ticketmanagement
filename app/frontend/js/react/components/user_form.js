import React, { Component } from "react"
import { Panel, Button, Col, Row, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux';
import { onChangeField, createTicket } from '../actions/form_ticket'
import _ from 'lodash'

class UserForm extends Component {
  render() {
    // const { name, message, status, id } = this.props.item;
    // const { name, message, status, id } = this.props.item;
    const { edited_name, edited_email, edited_password, edited_type } = this.props;

    return (
      <Panel className={ this.renderClassName(status) }>
        <Row>

          <Col xs={6}>
            <h3> New User </h3>

            <p>
                <input className="h3_input" value={ edited_name } placeholder={"Name"} onChange={ this.handleChange.bind(this, 'name') } />
                <input className="h3_input" value={ edited_email } placeholder={"Email"} onChange={ this.handleChange.bind(this, 'email') } />
                <input className="h3_input" value={ edited_password } placeholder={"Password"} onChange={ this.handleChange.bind(this, 'password') } />
            </p>
            <li>
              <ul>
                { this.renderButton() }
              </ul>
              <ul>
                { this.renderButton() }
              </ul>
            </li>
          </Col>

          <Col xs={2}>
          </Col>
        </Row>
      </Panel>
    );
  }

  handleChange(field, event) {
    const { onChangeField } = this.props;
    onChangeField(field, event.target.value)
  }

  renderClassName(status) {
    if (status == "closed") {
      return "book selected_book"
    } else {
      return "book"
    }
  }

  renderButton() {
    const { edited_name, edited_message } = this.props;
    const name = edited_name || "";
    const message = edited_message || "";
    if (name.length < 6 || message.length < 20) {
      return (<div>
                <Button bsStyle="success" className="button" disabled>Create</Button>
                <p>Name or description too short</p>
              </div>)
    } else if (name.length > 100 || message.length > 30000) {
      return (
        <div>
          <Button bsStyle="success" className="button" disabled>Create</Button>
          <p>Name or description too long</p>
        </div>)
    } else {
      return <Button bsStyle="success" className="button" onClick={ this.createTicket.bind(this) } >Create</Button>
    }
  }

  createTicket() {
    const { createTicket } = this.props;
    const { edited_name, edited_message } = this.props;
    createTicket({name: edited_name, message: edited_message});
  }
}

const mapStateToProps = ({ formTicketReducer }) => {
  return formTicketReducer;
};

export default connect(mapStateToProps, { onChangeField, createTicket })(UserForm);
