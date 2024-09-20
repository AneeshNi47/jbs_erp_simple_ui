import React, { Component } from "react";
import { Card, Container, Grid, Header, Icon, Tab, HeaderContent, HeaderSubheader } from "semantic-ui-react";
import { connect } from "react-redux";
import { getItem, getItems } from "../../actions/crud_operations";
import { GET_CLIENT, GET_PROJECTS, GET_CLIENT_INVOICES } from "../../actions/types";
import { Link } from "react-router-dom";
import ProjectListingTable from "../projects/ProjectListingTable";
import ClientInvoicesTable from "./ClientInvoicesTable";

class ClientDetailView extends Component {
    componentDidMount() {
        const { id } = this.props;
        this.props.getItem(GET_CLIENT, "clients", id);
        this.props.getItems(GET_PROJECTS, "user-projects", "client_id", id);
        this.props.getItems(GET_CLIENT_INVOICES, "client_invoices", "client_id", id);
    }

    render() {
        const { client, projects, client_invoices } = this.props;

        if (!client) {
            return <div>Loading...</div>;
        }

        const {
            name, address, contact_person, contact_email, support_email, total_projects_count, total_projects_value,
            created_on, total_invoices_count, total_invoices_value
        } = client;
        const date = new Date(created_on);
        const formattedDateTime = date.toLocaleString();

        // Define the panes for the Tab component
        const panes = [
            {
                menuItem: 'Projects',
                render: () => (
                    <Tab.Pane>
                        <h3>Projects</h3>
                        <ProjectListingTable projects={projects} />
                    </Tab.Pane>
                ),
            },
            {
                menuItem: 'Invoices',
                render: () => (
                    <Tab.Pane>
                        <h3>Client Invoices</h3>
                        <ClientInvoicesTable invoices={client_invoices} />
                    </Tab.Pane>
                ),
            },
        ];

        return (
            <Container>
                <Header as='h2'>
                    <Link to={`/clients`}>
                        <Icon name='arrow alternate circle left' />
                    </Link>
                    <HeaderContent>
                        {name}
                        <HeaderSubheader>Created on: {formattedDateTime}</HeaderSubheader>
                    </HeaderContent>
                </Header>

                {/* Client Information Cards */}
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Card>
                                <Card.Content>
                                    <Card.Header>{name}</Card.Header>
                                    <Card.Meta>Address: {address}</Card.Meta>
                                    <Card.Description>Contact Person: {contact_person}</Card.Description>
                                    <Card.Description>Contact Email: {contact_email}</Card.Description>
                                    <Card.Description>Support Email: {support_email}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid.Row>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Total Projects</Card.Header>
                                        <Card.Description>{total_projects_count}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Row>
                            <br />
                            <Grid.Row>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Total Invoices</Card.Header>
                                        <Card.Description>{total_invoices_count}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column>
                            <Grid.Row>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Total Project Value</Card.Header>
                                        <Card.Description>{total_projects_value ? total_projects_value : 0}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Row>
                            <br />
                            <Grid.Row>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Total Invoices Value</Card.Header>
                                        <Card.Description>{total_invoices_value ? total_invoices_value : 0}</Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {/* Tabs for Projects and Client Invoices */}
                <Tab panes={panes} />
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    client: state.clientsReducer.client,
    projects: state.projectsReducer.projects,
    client_invoices: state.clientsReducer.client_invoices, // Assuming you have this in your reducer
});

export default connect(mapStateToProps, { getItem, getItems })(ClientDetailView);
