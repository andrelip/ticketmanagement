import React, { Component } from "react"
import { Panel, Button, Col, Row, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux';
import { onChangeField, createTicket } from '../actions/form_ticket'
import _ from 'lodash'

class TicketForm extends Component {
  render() {
    // const { name, message, status, id } = this.props.item;
    // const { name, message, status, id } = this.props.item;
    const name = "oi"
    const message = "oi"
    const status = "open"
    const id = 13
    const { edited_name, edited_message } = this.props;

    return (
      <Panel className={ this.renderClassName(status) }>
        <Row>

          <Col xs={6}>
            <h3> New Ticket </h3>

            <p>
                <input className="h3_input" value={ edited_name } placeholder={"Subject"} onChange={ this.handleChange.bind(this, 'name') } />
            </p>
            <p>
              <FormControl value={ edited_message } onChange={ this.handleChange.bind(this, 'message')} componentClass="textarea" placeholder="Complete description" rows="8" />
            </p>
            <p>
              { this.renderButton() }
            </p>
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

export default connect(mapStateToProps, { onChangeField, createTicket })(TicketForm);
