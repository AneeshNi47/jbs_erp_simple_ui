import React, { Component } from "react";
import { Button, Form, Grid, Card, StatisticValue, StatisticLabel, Statistic } from "semantic-ui-react";
import { connect } from "react-redux";
import { getItems } from "../../actions/crud_operations";
import { GET_SUBCONTRACTORS } from "../../actions/types";
import ListingTable from "../ListingTable";

export class ListSubcontractors extends Component {
    state = {
        statusFilter: 0,
    };

    componentDidMount() {
        this.props.getItems(GET_SUBCONTRACTORS, "subcontractors", "status", null);
    }

    onChange = (e) => {
        this.setState({ statusFilter: e.target.value });
        this.props.getItems(
            GET_SUBCONTRACTORS,
            "subcontractors",
            "status",
            e.target.value === "8" ? null : e.target.value
        );
    };

    render() {
        const { statusFilter } = this.state;
        const { subcontractors } = this.props;

        // Count different types of subcontractors
        const totalSubcontractors = subcontractors.length;
        const activeSubcontractors = subcontractors.filter(
            (subcontractor) => subcontractor.is_active
        ).length;
        const inactiveSubcontractors = totalSubcontractors - activeSubcontractors;

        // Define headers and field keys for the ListingTable
        const headers = ["Name", "Address", "Contact Person", "Contact Email", "Support Email", "Total Invoices", "Total Value", "Total Value (With Tax)"];
        const fieldKeys = ["name", "address", "contact_person", "contact_email", "support_email", "total_invoices_count", "total_invoices_value", "total_invoices_value_with_tax"];

        return (
            <>
                <Grid>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Card>
                                <Statistic>
                                    <StatisticValue>{totalSubcontractors}</StatisticValue>
                                    <StatisticLabel>Subcontractors</StatisticLabel>
                                </Statistic>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Statistic>
                                    <StatisticValue>{activeSubcontractors}</StatisticValue>
                                    <StatisticLabel>Active</StatisticLabel>
                                </Statistic>
                            </Card>
                        </Grid.Column>
                        <Grid.Column>
                            <Card>
                                <Statistic>
                                    <StatisticValue>{inactiveSubcontractors}</StatisticValue>
                                    <StatisticLabel>Inactive</StatisticLabel>
                                </Statistic>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Grid>
                    <Grid.Row columns={3} verticalAlign="middle">
                        <Grid.Column>
                            <h3>Subcontractors</h3>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            <Form>
                                <Form.Field>
                                    <select
                                        name="status"
                                        value={statusFilter}
                                        onChange={this.onChange}
                                        aria-label="Filter by Status"
                                        className="ui dropdown"
                                    >
                                        <option value={8}>All</option>
                                        <option value={'Active'}>Active</option>
                                        <option value={'Inactive'}>Inactive</option>
                                    </select>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                        <Grid.Column textAlign="right">
                            <Button primary onClick={this.props.openAddSubContractor} icon>
                                Add Subcontractor
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <ListingTable
                    items={subcontractors}
                    headers={headers}
                    fieldKeys={fieldKeys}
                    editItem={this.props.editSubContractor}
                    deleteItem={this.props.deleteSubContractor}
                    viewLinkBase="/subcontractor-view"
                />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    subcontractors: state.subcontractorsReducer.subcontractors,
});

export default connect(mapStateToProps, { getItems })(ListSubcontractors);
