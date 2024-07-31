import React, { Component } from "react";
import AddClient from "./AddClient";
import ListClients from "./ListClients";
import { Modal, Button } from "semantic-ui-react";

export default class ClientDashboard extends Component {
  state = {
    show: false,
    clientData: null,
  };

  render() {
    const { show, clientData } = this.state;
    const handleClose = () => this.setState({ show: false, clientData: null });
    const handleShow = () => this.setState({ show: true });
    const editClient = (client) => this.setState({ clientData: client, show: true });
    
    return (
      <>
        <Modal open={show} onClose={handleClose} size="large">
          <Modal.Header>
            {clientData ? "Edit Client" : "Add New Client"}
          </Modal.Header>
          <Modal.Content>
            <AddClient closeAddClient={handleClose} clientData={clientData} />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={handleClose} negative>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
        

        <ListClients
          openAddClient={handleShow}
          editClient={(client) => editClient(client)}
        />
      </>
    );
  }
}
