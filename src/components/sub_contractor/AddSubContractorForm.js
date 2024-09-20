import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { addItem, updateItem } from "../../actions/crud_operations";
import { ADD_SUBCONTRACTOR, UPDATE_SUBCONTRACTOR } from "../../actions/types";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class AddSubContractor extends Component {
    state = {
        name: "",
        address: "",
        contact_person: "",
        contact_email: "",
        support_email: "",
        is_active: true
    };

    componentDidMount() {
        const { subcontractorData } = this.props;
        if (subcontractorData) {
            this.setState({
                ...subcontractorData,
            });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {
            name,
            address,
            contact_person,
            contact_email,
            support_email,
            is_active
        } = this.state;

        const data = {
            name,
            address,
            contact_person,
            contact_email,
            support_email,
            is_active,
        };

        const { subcontractorData } = this.props;
        if (subcontractorData) {
            this.props.updateItem(UPDATE_SUBCONTRACTOR, "subcontractors", subcontractorData.id, data);
        } else {
            this.props.addItem(ADD_SUBCONTRACTOR, "subcontractors", data);
        }
        this.props.closeAddSubContractor();
    };

    render() {
        const {
            name,
            address,
            contact_person,
            contact_email,
            support_email
        } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter name"
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

                <Button type="submit" primary>
                    {this.props.subcontractorData ? "Update" : "Create"}
                </Button>
            </Form>
        );
    }
}

AddSubContractor.propTypes = {
    addItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    closeAddSubContractor: PropTypes.func.isRequired,
    subcontractorData: PropTypes.object,
};

const mapStateToProps = (state) => ({
    // Define any required state mappings if necessary
});

export default connect(mapStateToProps, { addItem, updateItem })(AddSubContractor);
