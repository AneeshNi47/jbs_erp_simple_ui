import React, { Component } from "react";
import { Card, Grid, Modal, Header, Icon, HeaderContent, HeaderSubheader, Tab, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getItem, getItems } from "../../actions/crud_operations";
import { GET_PROJECT, GET_SUBCONTRACTOR_INVOICES, GET_CLIENT_INVOICES, GET_PURCHASES, GET_MISC_PURCHASES, GET_LABOURS } from "../../actions/types";
import { Link } from "react-router-dom";
import ListingTable from "../ListingTable";
import ClientInvoiceForm from '../clients/AddClientInvoiceForm';
import AddSubContractorInvoice from "../sub_contractor/AddSubContractorInvoice";
import AddLabour from "../labour/AddLabour";
import AddPurchase from "../purchase/AddPurchase";
import AddMiscPurchase from "../purchase/AddMiscPurchase";
import { purchaseHeaders, purchaseFieldKeys, miscPurchaseFieldKeys, miscPurchaseHeaders } from "../purchase/purchaseConst";
import { subcontractorFieldKeys, subcontractorHeaders } from "../sub_contractor/subcontractorConst";
import { labourFieldKeys, labourHeaders } from "../labour/labourConst";

class ProjectDetailView extends Component {
    state = {
        subcontractorInvoicesLoaded: false,
        clientInvoicesLoaded: false,
        purchasesLoaded: false,
        miscPurchasesLoaded: false,
        laboursLoaded: false,
        show: false,
        modalName: "",
        modalComponent: null,  // To store the component to render in the modal
        modalData: null,
    };

    handleClose = () => this.setState({ show: false, modalComponent: null, modalData: null });

    openModal = (modalName, modalComponent, modalData = null) => {
        this.setState({
            show: true,
            modalName,
            modalComponent,
            modalData,
        });
    };

    componentDidMount() {
        const { id } = this.props;
        this.props.getItem(GET_PROJECT, "projects", id);
    }

    loadSubcontractorInvoices = () => {
        const { id } = this.props;
        if (!this.state.subcontractorInvoicesLoaded) {
            this.props.getItems(GET_SUBCONTRACTOR_INVOICES, "subcontractor_invoices", "project_id", id);
            this.setState({ subcontractorInvoicesLoaded: true });
        }
    };

    loadClientInvoices = () => {
        const { id } = this.props;
        if (!this.state.clientInvoicesLoaded) {
            this.props.getItems(GET_CLIENT_INVOICES, "client_invoices", "project_id", id);
            this.setState({ clientInvoicesLoaded: true });
        }
    };

    loadPurchases = () => {
        const { id } = this.props;
        if (!this.state.purchasesLoaded) {
            this.props.getItems(GET_PURCHASES, "purchases", "project_id", id);
            this.setState({ purchasesLoaded: true });
        }
    };

    loadMiscPurchases = () => {
        const { id } = this.props;
        if (!this.state.miscPurchasesLoaded) {
            this.props.getItems(GET_MISC_PURCHASES, "miscs", "project_id", id);
            this.setState({ miscPurchasesLoaded: true });
        }
    };

    loadLabours = () => {
        const { id } = this.props;
        if (!this.state.laboursLoaded) {
            this.props.getItems(GET_LABOURS, "labours", "project_id", id);
            this.setState({ laboursLoaded: true });
        }
    };

    renderModalContent = () => {
        const { modalComponent: Component, modalData } = this.state;
        return Component ? <Component closeModal={this.handleClose} modalData={modalData} /> : null;
    };

    render() {
        const { project, subcontractor_invoices, client_invoices, purchases, misc_purchases, labours } = this.props;
        const { modalName, show } = this.state;
        if (!project) {
            return <div>Loading...</div>;
        }

        const {
            name, code, description, status, start_date, end_date, total_project_value, created_on, client
        } = project;

        const date = new Date(created_on);
        const formattedDateTime = date.toLocaleString();





        const panes = [
            {
                menuItem: {
                    key: 'dashboard',
                    content: 'Dashboard',
                },
                render: () => (
                    <Tab.Pane attached={false}>
                        <h3>Dashboard</h3>
                        <p>Here you can display some project overview data, charts, or statistics.</p>
                        {/* Add your dashboard content here */}
                    </Tab.Pane>
                )
            },
            {
                menuItem: {
                    key: 'subcontractor-invoices',
                    content: 'Subcontractor Invoices',
                    onClick: () => this.loadSubcontractorInvoices(), // Call on tab click
                },
                render: () => (
                    <Tab.Pane attached={false}>
                        <h3>Subcontractor Invoices</h3>
                        <ListingTable
                            items={subcontractor_invoices}
                            headers={subcontractorHeaders}
                            fieldKeys={subcontractorFieldKeys}
                            deleteItem={this.props.deleteSubcontractorInvoice}
                            viewLinkBase="/subcontractor-invoice-view"
                        />
                        <Button
                            primary
                            onClick={() => this.openModal("Subcontractor Invoice", AddSubContractorInvoice, { "project_id": this.props.id })}>
                            Add Subcontractor Invoice
                        </Button>
                    </Tab.Pane>
                )
            },
            {
                menuItem: {
                    key: 'client-invoices',
                    content: 'Client Invoices',
                    onClick: () => this.loadClientInvoices(), // Call on tab click
                },
                render: () => (
                    <Tab.Pane attached={false}>
                        <h3>Client Invoices</h3>
                        <Button
                            primary
                            onClick={() => this.openModal("Client Invoice", ClientInvoiceForm)}>
                            Add Client Invoice
                        </Button>
                    </Tab.Pane>
                )
            },
            {
                menuItem: {
                    key: 'purchase',
                    content: 'Purchases',
                    onClick: () => this.loadPurchases(), // Call on tab click
                },
                render: () => (
                    <Tab.Pane attached={false}>
                        <h3>Purchases</h3>
                        <ListingTable
                            items={purchases}
                            headers={purchaseHeaders}
                            fieldKeys={purchaseFieldKeys}
                            deleteItem={this.props.deleteSubcontractorInvoice}
                            viewLinkBase="/subcontractor-invoice-view"
                        />
                        <Button
                            primary
                            onClick={() => this.openModal("Purchase", AddPurchase, { "project_id": this.props.id })}>
                            Add Project Purchase
                        </Button>
                    </Tab.Pane>
                )
            },
            {
                menuItem: {
                    key: 'misc-purchase',
                    content: 'Misc Purchases',
                    onClick: () => this.loadMiscPurchases(), // Call on tab click
                },
                render: () => (
                    <Tab.Pane attached={false}>
                        <h3>Misc Purchases</h3>

                        <ListingTable
                            items={misc_purchases}
                            headers={miscPurchaseHeaders}
                            fieldKeys={miscPurchaseFieldKeys}
                            deleteItem={this.props.deleteSubcontractorInvoice}
                            viewLinkBase="/subcontractor-invoice-view"
                        />
                        <Button
                            primary
                            onClick={() => this.openModal("Misc Purchase", AddMiscPurchase, { "project_id": this.props.id })}>
                            Add Project Misc Purchase
                        </Button>
                    </Tab.Pane>
                )
            },
            {
                menuItem: {
                    key: 'labour',
                    content: 'Labours',
                    onClick: () => this.loadLabours(), // Call on tab click
                },
                render: () => (
                    <Tab.Pane attached={false}>
                        <h3>Labour</h3>

                        <ListingTable
                            items={labours}
                            headers={labourHeaders}
                            fieldKeys={labourFieldKeys}
                            deleteItem={this.props.deleteSubcontractorInvoice}
                            viewLinkBase="/subcontractor-invoice-view"
                        />
                        <Button
                            primary
                            onClick={() => this.openModal("Labour Expense", AddLabour, { "project_id": this.props.id })}>
                            Add Labour Expense
                        </Button>
                    </Tab.Pane>
                )
            },
        ];

        return (
            <>
                <Modal open={show} onClose={this.handleClose} size="large">
                    <Modal.Header>
                        {`Add New ${modalName}`}
                    </Modal.Header>
                    <Modal.Content>
                        {this.renderModalContent()}
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleClose} negative>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Header as='h2'>
                    <Link to={`/client-view/${client}`}>
                        <Icon name='arrow alternate circle left' />
                    </Link>
                    <HeaderContent>
                        {name}
                        <HeaderSubheader>Created on: {formattedDateTime}</HeaderSubheader>
                    </HeaderContent>
                </Header>

                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Card>
                                <Card.Content>
                                    <Card.Header>{name}</Card.Header>
                                    <Card.Meta>Code: {code}</Card.Meta>
                                    <Card.Description>{description}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Status</Card.Header>
                                    <Card.Description>{status}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Total Project Value</Card.Header>
                                    <Card.Description>{total_project_value}</Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    project: state.projectsReducer.project,
    subcontractor_invoices: state.subcontractorsReducer.subcontractor_invoices,
    client_invoices: state.clientsReducer.client_invoices,
    purchases: state.purchasesReducer.purchases,
    misc_purchases: state.purchasesReducer.misc_purchases,
    labours: state.laboursReducer.labours,
});

export default connect(mapStateToProps, {
    getItem,
    getItems,
    // Add necessary actions for delete, etc.
})(ProjectDetailView);
