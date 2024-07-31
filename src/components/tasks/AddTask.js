import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { addItem, updateItem } from "../../actions/crud_operations";
import { ADD_TASK, UPDATE_TASK } from "../../actions/types";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { TASK_STATUS_TYPES } from "../../actions/types";

export class AddTask extends Component {
  state = {
    title: "",
    description: "",
    status: 0,
    complete: false,
    is_active: true,
  };

  componentDidMount() {
    const { taskData } = this.props;
    if (taskData) {
      this.setState({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        complete: taskData.complete,
        is_active: taskData.is_active,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    const { title, description, status, complete, is_active } = this.state;
    const data = {
      title,
      description,
      status,
      complete,
      is_active,
    };

    const { taskData } = this.props;
    if (taskData) {
      this.props.updateItem(UPDATE_TASK,"task",taskData.id, data);
    } else {
      this.props.addItem(ADD_TASK,"task",);
    }
    this.props.closeAddTask();
  };

  render() {
    const { title, description, status } = this.state;
    return (
      <div>
        <h1>{this.props.taskData ? "Edit Task" : "Create new Task"}</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={title}
              onChange={this.onChange}
            />
            <Form.Text className="text-muted">
              Give a short Title for your task
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              name="description"
              value={description}
              onChange={this.onChange}
            />
            <Form.Text className="text-muted">Describe your task</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={status}
              onChange={this.onChange}
              aria-label="Default select example"
            >
              <option value={0}>{TASK_STATUS_TYPES[0]}</option>
              <option value={1}>{TASK_STATUS_TYPES[1]}</option>
              <option value={2}>{TASK_STATUS_TYPES[2]}</option>
              <option value={3}>{TASK_STATUS_TYPES[3]}</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            {this.props.taskData ? "Update" : "Create"}
          </Button>
        </Form>
      </div>
    );
  }
}

AddTask.propTypes = {
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  taskData: PropTypes.object,
};

export default connect(null, { addItem, updateItem })(AddTask);
