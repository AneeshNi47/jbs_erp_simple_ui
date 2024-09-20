import React from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

const ClientInvoicesTable = ({ invoices, editInvoice, deleteInvoice }) => {
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>#</Table.HeaderCell>
                    <Table.HeaderCell>Basic Value</Table.HeaderCell>
                    <Table.HeaderCell>Tax Percentage</Table.HeaderCell>
                    <Table.HeaderCell>Total Tax</Table.HeaderCell>
                    <Table.HeaderCell>Retention</Table.HeaderCell>
                    <Table.HeaderCell>TDS Percentage</Table.HeaderCell>
                    <Table.HeaderCell>WWF Percentage</Table.HeaderCell>
                    <Table.HeaderCell>Created On</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {invoices.map((invoice, index) => (
                    <Table.Row key={invoice.id}>
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{invoice.basic_value}</Table.Cell>
                        <Table.Cell>{invoice.tax_percentage}%</Table.Cell>
                        <Table.Cell>{invoice.total_tax ? invoice.total_tax : "N/A"}</Table.Cell>
                        <Table.Cell>{invoice.retention}</Table.Cell>
                        <Table.Cell>{invoice.tds_percentage}%</Table.Cell>
                        <Table.Cell>{invoice.wwf_percentage}%</Table.Cell>
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
                            <Link to={`/invoice-view/${invoice.id}`}>
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

export default ClientInvoicesTable;
