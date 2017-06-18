import React, { Component } from "react"
import { Panel, Button, Col, Row, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux';
import { onChangeField } from '../actions/form_ticket'
import _ from 'lodash'

class TicketForm extends Component {
  render() {
    // const { name, message, status, id } = this.props.item;
    // const { name, message, status, id } = this.props.item;
    const name = "oi"
    const message = "oi"
    const status = "open"
    const id = 13
    const { edited_name, edited_description } = this.props;

    return (
      <Panel className={ this.renderClassName(status) }>
        <Row>

          <Col xs={6}>
            <h3> New Ticket </h3>

            <p>
                name
                <input className="h3_input" value={ edited_name } onChange={ this.handleChange.bind(this, 'name') } />
            </p>
            <p>
                Description
              <FormControl value={edited_description} componentClass="textarea" placeholder="textarea" rows="8" />
            </p>
          </Col>

          <Col xs={2}>
            <Button bsStyle="success" className="button" >Create</Button>
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
}

const mapStateToProps = ({ formTicketReducer }) => {
  return formTicketReducer;
};

export default connect(mapStateToProps, { onChangeField })(TicketForm);
