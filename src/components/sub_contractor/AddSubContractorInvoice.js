import React, { Component } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import { addItem, updateItem, getItems } from "../../actions/crud_operations";
import { ADD_SUBCONTRACTOR_INVOICE, UPDATE_SUBCONTRACTOR_INVOICE, GET_PROJECTS, GET_SUBCONTRACTORS } from "../../actions/types";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class AddSubContractorInvoice extends Component {
    state = {
        total_value_without_tax: "",
        tax_percentage: "",
        sub_contractor: "",
        project: "",
        projectOptions: [],
        subContractorOptions: []
    };

    componentDidMount() {
        const { invoiceData, modalData } = this.props;

        // If editing an existing invoice, populate state with existing data
        if (invoiceData) {
            this.setState({
                ...invoiceData,
            });
        }

        // Fetch subcontractors list
        this.props.getItems(GET_SUBCONTRACTORS, "subcontractors");

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

        // Update subcontractor options when subcontractors are fetched
        if (prevProps.subcontractors !== this.props.subcontractors) {
            this.setState({
                subContractorOptions: this.props.subcontractors.map((subContractor) => ({
                    key: subContractor.id,
                    text: subContractor.name,
                    value: subContractor.id,
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
            total_value_without_tax,
            tax_percentage,
            sub_contractor,
            project,
        } = this.state;

        const data = {
            total_value_without_tax,
            tax_percentage,
            sub_contractor,
            project: this.props.modalData.project_id || project, // Use passed project_id or selected project
        };

        const { invoiceData } = this.props;

        if (invoiceData) {
            this.props.updateItem(UPDATE_SUBCONTRACTOR_INVOICE, "subcontractor_invoices", invoiceData.id, data);
        } else {
            this.props.addItem(ADD_SUBCONTRACTOR_INVOICE, "subcontractor_invoices", data);
        }
        this.props.closeModal();
    };

    render() {
        const {
            total_value_without_tax,
            tax_percentage,
            sub_contractor,
            project,
            projectOptions,
            subContractorOptions
        } = this.state;

        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Total Value Without Tax</label>
                    <input
                        type="text"
                        placeholder="Enter total value without tax"
                        name="total_value_without_tax"
                        value={total_value_without_tax}
                        onChange={this.onChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Tax Percentage</label>
                    <input
                        type="text"
                        placeholder="Enter tax percentage"
                        name="tax_percentage"
                        value={tax_percentage}
                        onChange={this.onChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Sub Contractor</label>
                    <Dropdown
                        placeholder="Select Sub Contractor"
                        fluid
                        selection
                        options={subContractorOptions}
                        name="sub_contractor"
                        value={sub_contractor}
                        onChange={this.onDropdownChange}
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
                    {this.props.invoiceData ? "Update" : "Create"}
                </Button>
            </Form>
        );
    }
}

AddSubContractorInvoice.propTypes = {
    addItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    getItems: PropTypes.func.isRequired,
    closeAddSubContractorInvoice: PropTypes.func.isRequired,
    invoiceData: PropTypes.object,
    modalData: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    subcontractors: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    projects: state.projectsReducer.projects,
    subcontractors: state.subcontractorsReducer.subcontractors,
});

export default connect(mapStateToProps, { addItem, updateItem, getItems })(AddSubContractorInvoice);
