import React, { Component } from "react";
import { Table, Button, Card, Grid, StatisticLabel, StatisticValue, Statistic } from "semantic-ui-react";
import { GET_CLIENTS } from "../../actions/types";
import { getItems } from "../../actions/crud_operations";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class ListClients extends Component {
  componentDidMount() {
    this.props.getItems(GET_CLIENTS, "clients", "", null);
  }

  handleDelete = (id) => {
    console.log(id)
  };

  render() {
    const { clients } = this.props;
    const totalProjects = 0
    return (
      <>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Card>
                <Statistic>
                  <StatisticValue>{totalProjects}</StatisticValue>
                  <StatisticLabel>Project</StatisticLabel>
                </Statistic>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Statistic>
                  <StatisticValue>{totalProjects}</StatisticValue>
                  <StatisticLabel>Active Clients</StatisticLabel>
                </Statistic>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
          <Grid.Row columns={3} verticalAlign="middle">
            <Grid.Column>
              <h3>Clients</h3>
            </Grid.Column>
            <Grid.Column textAlign="right">

              <Button primary onClick={this.props.openAddClient} icon>
                Add Client
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Contact Person</Table.HeaderCell>
              <Table.HeaderCell>Contact Email</Table.HeaderCell>
              <Table.HeaderCell>Support Email</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {clients && clients.map((client) => (
              <Table.Row key={client.id}>
                <Table.Cell>{client.name}</Table.Cell>
                <Table.Cell>{client.address}</Table.Cell>
                <Table.Cell>{client.contact_person}</Table.Cell>
                <Table.Cell>{client.contact_email}</Table.Cell>
                <Table.Cell>{client.support_email}</Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => this.handleDelete(client.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table></>
    );
  }
}

ListClients.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  clients: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  clients: state.clientsReducer.clients,
});

export default connect(mapStateToProps, { getItems })(ListClients);
