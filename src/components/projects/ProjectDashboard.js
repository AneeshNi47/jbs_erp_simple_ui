import React, { Component } from "react";
import AddProject from "./AddProject";
import ListProjects from "./ListProjects";
import { Modal, Button } from "semantic-ui-react";

export default class ProjectDashboard extends Component {
  state = {
    show: false,
    projectData: null,
  };

  render() {
    const { show, projectData } = this.state;
    const handleClose = () => this.setState({ show: false, projectData: null });
    const handleShow = () => this.setState({ show: true });
    const editProject = (project) => this.setState({ projectData: project, show: true });
    
    return (
      <>
        <Modal open={show} onClose={handleClose} size="large">
          <Modal.Header>
            {projectData ? "Edit Project" : "Add New Project"}
          </Modal.Header>
          <Modal.Content>
            <AddProject closeAddProject={handleClose} projectData={projectData} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleClose} negative>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
        

        <ListProjects
          openAddProject={handleShow}
          editProject={(project) => editProject(project)}
        />
      </>
    );
  }
}
