import React, { Component } from "react";
import { Button, Card, Grid, StatisticLabel, StatisticValue, Statistic } from "semantic-ui-react";
import { GET_CLIENTS } from "../../actions/types";
import { getItems } from "../../actions/crud_operations";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListingTable from "../ListingTable";  // Ensure the path is correct for ListingTable

export class ListClients extends Component {
  componentDidMount() {
    this.props.getItems(GET_CLIENTS, "clients", "", null);
  }

  handleDelete = (id) => {
    console.log(id);
  };

  render() {
    const { clients } = this.props;
    const totalProjects = 0;

    // Define headers and field keys for the ListingTable
    const headers = ["S.no", "Name", "Address", "Contact Person", "Contact Email", "Support Email"];
    const fieldKeys = ["id", "name", "address", "contact_person", "contact_email", "support_email"];

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
                  <StatisticValue>{clients.length}</StatisticValue>
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

        <ListingTable
          items={clients}
          headers={headers}
          fieldKeys={fieldKeys}
          deleteItem={this.handleDelete}
          viewLinkBase="/client-view"
        />
      </>
    );
  }
}

ListClients.propTypes = {
  getItems: PropTypes.func.isRequired,
  clients: PropTypes.array.isRequired,
  openAddClient: PropTypes.func, // Optional if not provided
};

const mapStateToProps = (state) => ({
  clients: state.clientsReducer.clients,
});

export default connect(mapStateToProps, { getItems })(ListClients);
