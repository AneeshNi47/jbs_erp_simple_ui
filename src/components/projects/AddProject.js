import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import Select from "react-select";
import { addItem, updateItem, getItems } from "../../actions/crud_operations";
import { ADD_PROJECT, UPDATE_PROJECT, GET_CLIENTS, GET_COMPANY_USERS } from "../../actions/types";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class AddProject extends Component {
  state = {
    name: "",
    code: "---",
    description: "",
    status: "planning",
    start_date: "",
    end_date: "",
    total_project_value: "",
    total_project_management_cost_allocated: "",
    total_purchase_cost_allocated: "",
    total_misc_cost_allocated: "",
    total_erection_cost_allocated: "",
    projected_marginal_profit: "",
    projected_erection_profit: "",
    projected_duration: "",
    managers: [], // Updated state to handle multiple managers
    client: "",
    new_client: {
      name: "",
      address: "",
      contact_person: "",
      contact_email: "",
      support_email: ""
    },
    is_active: true,
    users: [],
    clients: [],
    creatingNewClient: false,
  };

  componentDidMount() {
    this.props.getItems(GET_CLIENTS, "clients", "status", null);
    this.props.getItems(GET_COMPANY_USERS, "company_user", "status", null);

    const { projectData } = this.props;
    if (projectData) {
      this.setState({
        ...projectData,
        managers: projectData.managers.map(manager => manager.id),
        client: projectData.client.id,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onNewClientChange = (e) => {
    this.setState({
      new_client: { ...this.state.new_client, [e.target.name]: e.target.value },
    });
  };

  handleClientChange = (selectedOption) => {
    if (selectedOption) {
      const selectedClient = this.props.clients.find(client => client.id === selectedOption.value);
      this.setState({
        client: selectedOption.value,
        creatingNewClient: false,
        new_client: {
          name: selectedClient.name,
          address: selectedClient.address,
          contact_person: selectedClient.contact_person,
          contact_email: selectedClient.contact_email,
          support_email: selectedClient.support_email
        }
      });
    } else {
      this.setState({
        client: "",
        creatingNewClient: true,
        new_client: {
          name: "",
          address: "",
          contact_person: "",
          contact_email: "",
          support_email: ""
        }
      });
    }
  };

  handleManagerChange = (selectedOptions) => {
    const managers = selectedOptions ? selectedOptions.map(option => option.value) : [];
    this.setState({ managers });
  };

  toggleNewClient = () => {
    this.setState({ creatingNewClient: !this.state.creatingNewClient });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      name,
      code,
      description,
      status,
      start_date,
      end_date,
      total_project_value,
      total_project_management_cost_allocated,
      total_purchase_cost_allocated,
      total_misc_cost_allocated,
      total_erection_cost_allocated,
      projected_marginal_profit,
      projected_erection_profit,
      projected_duration,
      managers, // Ensure managers are included in the data
      client,
      new_client,
      is_active,
      creatingNewClient,
    } = this.state;

    const data = {
      name,
      code,
      description,
      status,
      start_date,
      end_date,
      total_project_value,
      total_project_management_cost_allocated,
      total_purchase_cost_allocated,
      total_misc_cost_allocated,
      total_erection_cost_allocated,
      projected_marginal_profit,
      projected_erection_profit,
      projected_duration,
      managers, // Include managers in the data to be sent
      client: creatingNewClient ? new_client : client,
      is_active,
    };

    const { projectData } = this.props;
    if (projectData) {
      this.props.updateItem(UPDATE_PROJECT, "project", projectData.id, data);
    } else {
      this.props.addItem(ADD_PROJECT, "project", data);
    }
    this.props.closeAddProject();
  };

  render() {
    const {
      name,
      code,
      description,
      status,
      start_date,
      end_date,
      total_project_value,
      total_project_management_cost_allocated,
      total_purchase_cost_allocated,
      total_misc_cost_allocated,
      total_erection_cost_allocated,
      projected_marginal_profit,
      projected_erection_profit,
      projected_duration,
      managers,
      client,
      new_client,
      creatingNewClient,
    } = this.state;
    const { clients, companyUsers } = this.props;

    const clientOptions = clients.map(client => ({
      value: client.id,
      label: client.name
    }));

    const managerOptions = companyUsers.map(user => ({
      value: user.user,
      label: `${user.first_name} ${user.last_name}`
    }));

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Group widths="equal">
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
            <label>Code</label>
            <input
              type="text"
              placeholder="Enter code"
              name="code"
              value={code}
              onChange={this.onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Field>
          <label>Description</label>
          <textarea
            placeholder="Enter description"
            name="description"
            value={description}
            onChange={this.onChange}
          />
        </Form.Field>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={start_date}
              onChange={this.onChange}
            />
          </Form.Field>

          <Form.Field>
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={end_date}
              onChange={this.onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Total Project Value</label>
            <input
              type="number"
              placeholder="Enter total project value"
              name="total_project_value"
              value={total_project_value}
              onChange={this.onChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Total Project Management Cost Allocated</label>
            <input
              type="number"
              placeholder="Enter total project management cost allocated"
              name="total_project_management_cost_allocated"
              value={total_project_management_cost_allocated}
              onChange={this.onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Total Purchase Cost Allocated</label>
            <input
              type="number"
              placeholder="Enter total purchase cost allocated"
              name="total_purchase_cost_allocated"
              value={total_purchase_cost_allocated}
              onChange={this.onChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Total Misc Cost Allocated</label>
            <input
              type="number"
              placeholder="Enter total misc cost allocated"
              name="total_misc_cost_allocated"
              value={total_misc_cost_allocated}
              onChange={this.onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Total Erection Cost Allocated</label>
            <input
              type="number"
              placeholder="Enter total erection cost allocated"
              name="total_erection_cost_allocated"
              value={total_erection_cost_allocated}
              onChange={this.onChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Projected Marginal Profit</label>
            <input
              type="number"
              placeholder="Enter projected marginal profit"
              name="projected_marginal_profit"
              value={projected_marginal_profit}
              onChange={this.onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Projected Erection Profit</label>
            <input
              type="number"
              placeholder="Enter projected erection profit"
              name="projected_erection_profit"
              value={projected_erection_profit}
              onChange={this.onChange}
            />
          </Form.Field>

          <Form.Field>
            <label>Projected Duration</label>
            <input
              type="number"
              placeholder="Enter projected duration"
              name="projected_duration"
              value={projected_duration}
              onChange={this.onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Field>
          <label>Status</label>
          <select name="status" value={status} onChange={this.onChange}>
            <option value="planning">Planning</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
          </select>
        </Form.Field>

        <Form.Group widths="equal">
          <Form.Field>
            <label>Manager</label>
            <Select
              name="managers"
              value={managerOptions.filter(option => managers.includes(option.value))}
              options={managerOptions}
              onChange={this.handleManagerChange}
              isMulti
              isClearable
            />
          </Form.Field>

          <Form.Field>
            <label>Client</label>
            <Select
              name="client"
              value={clientOptions.find(option => option.value === client)}
              options={clientOptions}
              onChange={this.handleClientChange}
              isClearable
            />
            <Button type="button" onClick={this.toggleNewClient}>
              {creatingNewClient ? "Select Existing Client" : "Create New Client"}
            </Button>
          </Form.Field>
        </Form.Group>

        {creatingNewClient && (
          <>
            <Form.Field>
              <label>Client Name</label>
              <input
                type="text"
                placeholder="Enter client name"
                name="name"
                value={new_client.name}
                onChange={this.onNewClientChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter address"
                name="address"
                value={new_client.address}
                onChange={this.onNewClientChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Contact Person</label>
              <input
                type="text"
                placeholder="Enter contact person"
                name="contact_person"
                value={new_client.contact_person}
                onChange={this.onNewClientChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Contact Email</label>
              <input
                type="email"
                placeholder="Enter contact email"
                name="contact_email"
                value={new_client.contact_email}
                onChange={this.onNewClientChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Support Email</label>
              <input
                type="email"
                placeholder="Enter support email"
                name="support_email"
                value={new_client.support_email}
                onChange={this.onNewClientChange}
              />
            </Form.Field>
          </>
        )}

        <Button type="submit" primary>
          {this.props.projectData ? "Update" : "Create"}
        </Button>
      </Form>
    );
  }
}

AddProject.propTypes = {
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  closeAddProject: PropTypes.func.isRequired,
  projectData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  clients: state.clientsReducer.clients,
  companyUsers: state.companyUsersReducer.companyUsers
});

export default connect(mapStateToProps, { addItem, updateItem, getItems })(AddProject);
