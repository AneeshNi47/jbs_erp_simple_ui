import React from "react";
import { Table, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

const ListingTable = ({ items, headers, fieldKeys, editItem, deleteItem, viewLinkBase }) => {
    return (
        <Table celled striped>
            <Table.Header>
                <Table.Row>
                    {headers.map((header, index) => (
                        <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
                    ))}
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {items.map((item, index) => (
                    <Table.Row key={item[fieldKeys[0]]}>
                        {fieldKeys.map((key, index) => (
                            <Table.Cell key={index}>{item[key]}</Table.Cell>
                        ))}
                        <Table.Cell>
                            {editItem && (
                                <Button
                                    icon
                                    color="yellow"
                                    onClick={() => editItem(item)}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            )}
                            {deleteItem && (
                                <Button icon color="red" onClick={() => deleteItem(item[fieldKeys[0]])}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </Button>
                            )}
                            {viewLinkBase && (
                                <Link to={`${viewLinkBase}/${item[fieldKeys[0]]}`}>
                                    <Button color="blue">
                                        <FontAwesomeIcon icon={faArrowAltCircleRight} />
                                    </Button>
                                </Link>
                            )}
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default ListingTable;
