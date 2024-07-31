import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { addItem } from "../../actions/crud_operations";
import { ADD_CLIENT } from "../../actions/types";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class AddClient extends Component {
  state = {
    name: "",
    address: "",
    contact_person: "",
    contact_email: "",
    support_email: ""
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, address, contact_person, contact_email, support_email } = this.state;

    const data = {
      name,
      address,
      contact_person,
      contact_email,
      support_email
    };

    this.props.addItem(ADD_CLIENT, "clients", data);
    this.props.closeAddClient();
  };

  render() {
    const { name, address, contact_person, contact_email, support_email } = this.state;

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter client name"
            name="name"
            value={name}
            onChange={this.onChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter address"
            name="address"
            value={address}
            onChange={this.onChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Contact Person</label>
          <input
            type="text"
            placeholder="Enter contact person"
            name="contact_person"
            value={contact_person}
            onChange={this.onChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Contact Email</label>
          <input
            type="email"
            placeholder="Enter contact email"
            name="contact_email"
            value={contact_email}
            onChange={this.onChange}
          />
        </Form.Field>

        <Form.Field>
          <label>Support Email</label>
          <input
            type="email"
            placeholder="Enter support email"
            name="support_email"
            value={support_email}
            onChange={this.onChange}
          />
        </Form.Field>

        <Button type="submit" primary>Create</Button>
      </Form>
    );
  }
}

AddClient.propTypes = {
  addItem: PropTypes.func.isRequired,
  closeAddClient: PropTypes.func.isRequired,
};

export default connect(null, { addItem })(AddClient);
