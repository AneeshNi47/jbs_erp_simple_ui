import React from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

const SubContractorInvoicesTable = ({ invoices, editInvoice, deleteInvoice }) => {
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Total Value (Without Tax)</Table.HeaderCell>
                    <Table.HeaderCell>Tax Percentage</Table.HeaderCell>
                    <Table.HeaderCell>Total Tax</Table.HeaderCell>
                    <Table.HeaderCell>Total Value (With Tax)</Table.HeaderCell>
                    <Table.HeaderCell>Created On</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {invoices.map((invoice, index) => (
                    <Table.Row key={invoice.id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{invoice.total_value_without_tax}</Table.Cell>
                        <Table.Cell>{invoice.tax_percentage}%</Table.Cell>
                        <Table.Cell>{invoice.total_tax}</Table.Cell>
                        <Table.Cell>{invoice.total_value_with_tax}</Table.Cell>
                        <Table.Cell>{new Date(invoice.created_on).toLocaleString()}</Table.Cell>
                        <Table.Cell>
                            {editInvoice && (
                                <Button
                                    icon
                                    color="yellow"
                                    onClick={() => editInvoice(invoice)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            )}
                            {deleteInvoice && (
                                <Button icon color="red" onClick={() => deleteInvoice(invoice.id)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            )}
                            <Link to={`/subcontractor-invoice-view/${invoice.id}`}>
                                <Button color="blue">
                                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                                </Button>
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default SubContractorInvoicesTable;
