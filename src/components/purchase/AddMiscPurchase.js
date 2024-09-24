import React, { Component } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import { addItem, updateItem, getItems } from "../../actions/crud_operations";
import { ADD_MISC_PURCHASE, UPDATE_MISC_PURCHASE, GET_PROJECTS } from "../../actions/types";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class AddMiscPurchase extends Component {
    state = {
        misc_type: "",
        status: "",
        total_value_without_tax: 0,
        tax_percentage: 0,
        remarks: "",
        project: null,
        projectOptions: []
    };

    componentDidMount() {
        const { purchaseData, modalData } = this.props;

        // If editing an existing purchase, populate state with existing data
        if (purchaseData) {
            this.setState({
                ...purchaseData,
            });
        }

        // Fetch projects if no project_id is provided
        if (!modalData.project_id) {
            this.props.getItems(GET_PROJECTS, "user-projects");
        } else {
            this.setState({
                project: modalData.project_id
            });
        }
    }

    componentDidUpdate(prevProps) {
        // Update project options when projects are fetched
        if (prevProps.projects !== this.props.projects) {
            this.setState({
                projectOptions: this.props.projects.map((project) => ({
                    key: project.id,
                    text: project.name,
                    value: project.id,
                })),
            });
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onDropdownChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const {
            misc_type,
            status,
            total_value_without_tax,
            tax_percentage,
            remarks,
            project,
        } = this.state;

        const data = {
            misc_type,
            status,
            total_value_without_tax,
            tax_percentage,
            remarks,
            project: this.props.modalData.project_id || project, // Use passed project_id or selected project
        };

        const { purchaseData } = this.props;

        if (purchaseData) {
            this.props.updateItem(UPDATE_MISC_PURCHASE, "miscs", purchaseData.id, data);
        } else {
            this.props.addItem(ADD_MISC_PURCHASE, "miscs", data);
        }
        this.props.closeModal();
    };

    render() {
        const {
            misc_type,
            status,
            total_value_without_tax,
            tax_percentage,
            remarks,
            project,
            projectOptions
        } = this.state;

        const statusOptions = [
            { key: 1, text: "Created", value: "created" },
            { key: 2, text: "Send", value: "send" },
            { key: 3, text: "Delivered", value: "delivered" },
            { key: 4, text: "Paid Partial", value: "paid_partial" },
            { key: 3, text: "Paid Full", value: "paid_full" },
            { key: 4, text: "Cancelled", value: "cancelled" }
        ];

        const miscTypeOptions = [
            { key: 1, text: "Local Purchase", value: "Local Purchase" },
            { key: 2, text: "Import", value: "Import" },
            { key: 3, text: "Service", value: "Service" }
        ];

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Miscellaneous Type</label>
                    <Dropdown
                        placeholder="Select Type"
                        fluid
                        selection
                        options={miscTypeOptions}
                        name="misc_type"
                        value={misc_type}
                        onChange={this.onDropdownChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Status</label>
                    <Dropdown
                        placeholder="Select Status"
                        fluid
                        selection
                        options={statusOptions}
                        name="status"
                        value={status}
                        onChange={this.onDropdownChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Total Value Without Tax</label>
                    <input
                        type="number"
                        placeholder="Enter Total Value Without Tax"
                        name="total_value_without_tax"
                        value={total_value_without_tax}
                        onChange={this.onChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Tax Percentage</label>
                    <input
                        type="number"
                        placeholder="Enter Tax Percentage"
                        name="tax_percentage"
                        value={tax_percentage}
                        onChange={this.onChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Remarks</label>
                    <Form.TextArea
                        placeholder="Enter Remarks"
                        name="remarks"
                        value={remarks}
                        onChange={this.onChange}
                    />
                </Form.Field>

                {!this.props.modalData.project_id && (
                    <Form.Field>
                        <label>Project</label>
                        <Dropdown
                            placeholder="Select Project"
                            fluid
                            selection
                            options={projectOptions}
                            name="project"
                            value={project}
                            onChange={this.onDropdownChange}
                        />
                    </Form.Field>
                )}

                <Button type="submit" primary>
                    {this.props.purchaseData ? "Update" : "Create"}
                </Button>
            </Form>
        );
    }
}

AddMiscPurchase.propTypes = {
    addItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    purchaseData: PropTypes.object,
    modalData: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
});

export default connect(mapStateToProps, { addItem, updateItem, getItems })(AddMiscPurchase);
