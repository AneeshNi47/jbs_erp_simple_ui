import React, { Component } from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";
import { addItem, updateItem, getItems } from "../../actions/crud_operations";
import { ADD_LABOUR, UPDATE_LABOUR, GET_PROJECTS } from "../../actions/types";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class AddLabour extends Component {
    state = {
        status: "",
        labour_expense: 0,
        remarks: "",
        project: null,
        projectOptions: []
    };

    componentDidMount() {
        const { invoiceData, modalData } = this.props;

        // If editing an existing invoice, populate state with existing data
        if (invoiceData) {
            this.setState({
                ...invoiceData,
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
            total_value_without_tax,
            tax_percentage,
            sub_contractor,
            project, remarks,
        } = this.state;

        const data = {
            total_value_without_tax,
            tax_percentage,
            sub_contractor, remarks,
            project: this.props.modalData.project_id || project, // Use passed project_id or selected project
        };

        const { invoiceData } = this.props;

        if (invoiceData) {
            this.props.updateItem(UPDATE_LABOUR, "labours", invoiceData.id, data);
        } else {
            this.props.addItem(ADD_LABOUR, "labours", data);
        }
        this.props.closeModal();
    };

    render() {
        const {
            labour_expense,
            status,
            remarks,
            project,
            projectOptions
        } = this.state;
        const statusOptions = [
            {
                key: 1,
                text: "Created",
                value: "created"
            },
            {
                key: 2,
                text: "Submitted",
                value: "submitted"
            },
            {
                key: 3,
                text: "Paid",
                value: "paid"
            },
            {
                key: 4,
                text: "Rejected",
                value: "rejected"
            }
        ]
        return (
            <Form onSubmit={this.onSubmit}>

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
                    <label>Labour Expense</label>
                    <input
                        type="number"
                        placeholder="Enter Labour Expense"
                        name="labour_expense"
                        value={labour_expense}
                        onChange={this.onChange}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Remarks</label>

                    <Form.TextArea
                        placeholder="Enter a detailed Remarks"
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
                    {this.props.invoiceData ? "Update" : "Create"}
                </Button>
            </Form>
        );
    }
}

AddLabour.propTypes = {
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

export default connect(mapStateToProps, { addItem, updateItem, getItems })(AddLabour);
