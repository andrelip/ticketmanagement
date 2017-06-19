import React, { Component } from "react"
import { Panel, Button, Col, Row, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux';
import { onChangeField, createUser } from '../actions/form_user'
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
                <input type="password" className="h3_input" value={ edited_password } placeholder={"Password"} onChange={ this.handleChange.bind(this, 'password') } />
            </p>
            { this.renderButton() }
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
    return <Button bsStyle="success" className="button" onClick={ this.handleCreateButton.bind(this) } >Create</Button>
  }

  handleCreateButton() {
    const { createUser } = this.props;
    const {  edited_name, edited_email, edited_password, edited_type } = this.props;
    createUser({name: edited_name, email: edited_email, password: edited_password});
  }
}

const mapStateToProps = ({ formUserReducer }) => {
  return formUserReducer;
};

export default connect(mapStateToProps, { onChangeField, createUser })(UserForm);
