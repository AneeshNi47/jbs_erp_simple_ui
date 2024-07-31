import React, { Component } from "react";
import { Button, Table, Form, Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import { getItems } from "../../actions/crud_operations";
import { TASK_STATUS_TYPES } from "../../actions/types";
import { GET_TASKS } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export class ListTasks extends Component {
  state = {
    statusFilter: 0,
  };

  componentDidMount() {
    this.props.getItems(GET_TASKS, "task", "status",null);
  }

  onChange = (e) => {
    this.setState({ statusFilter: e.target.value });
    this.props.getItems(GET_TASKS, "task", "status", e.target.value === "8" ? null : e.target.value);
  };

  render() {
    const { statusFilter } = this.state;

    return (
      <Container>
        <Row className="mb-3 align-items-center">
          <Col>
            <h3>Your Tasks</h3>
          </Col>
          <Col md="auto">
            <Form>
              <Form.Group controlId="formBasicStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={statusFilter}
                  onChange={this.onChange}
                  aria-label="Filter by Status"
                >
                  <option value={8}>All</option>
                  <option value={0}>{TASK_STATUS_TYPES[0]}</option>
                  <option value={1}>{TASK_STATUS_TYPES[1]}</option>
                  <option value={2}>{TASK_STATUS_TYPES[2]}</option>
                  <option value={3}>{TASK_STATUS_TYPES[3]}</option>
                  <option value={9}>Trash</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
          <Col md="auto">
            <Button variant="primary" onClick={this.props.openAddTask}>
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{TASK_STATUS_TYPES[task.status]}</td>
                <td>
                  <Row>
                    <Col md="auto">
                      <Button
                        variant="warning"
                        onClick={() => this.props.editTask(task)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    </Col>
                    <Col md="auto">
                      <Button variant="danger" onClick={this.props.openAddTask}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasksReducer.tasks,
});

export default connect(mapStateToProps, { getItems })(ListTasks);
