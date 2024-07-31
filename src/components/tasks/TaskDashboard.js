import React, { Component } from "react";
import AddTask from "./AddTask";
import ListTasks from "./ListTasks";
import { Modal, Button } from "react-bootstrap";

export default class TaskDashboard extends Component {
  state = {
    show: false,
    taskData: null,
  };

  render() {
    const { show, taskData } = this.state;
    const handleClose = () => this.setState({ show: false, taskData: null });
    const handleShow = () => this.setState({ show: true });
    const editTask = (task) => this.setState({ taskData: task, show: true });
    return (
      <div className="container">
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <AddTask closeAddTask={handleClose} taskData={taskData} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <ListTasks
          openAddTask={handleShow}
          editTask={(task) => editTask(task)}
        />
      </div>
    );
  }
}
