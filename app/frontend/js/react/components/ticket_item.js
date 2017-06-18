import React, { Component } from "react"
import { Panel, Button, Col, Row, Image, Label } from 'react-bootstrap'
import { connect } from 'react-redux';
import _ from 'lodash'

class Ticket extends Component {
  render() {
    const { name, message, status } = this.props.item;
    return (
      <Panel className={ this.renderClassName(status) }>
        <Row>

          <Col xs={10}>
            <h3> { name} </h3>

            <p>{ message }</p>
          </Col>

          <Col xs={2}>
            <Button bsStyle="info" className="button" >Change to completed</Button>
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
}

export default connect(null, {})(Ticket);
