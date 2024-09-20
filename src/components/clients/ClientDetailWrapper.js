import React from 'react';
import { useParams } from 'react-router-dom';
import ClientDetailView from './ClientDetailView';

const ClientDetailViewWrapper = (props) => {
    const { id } = useParams();
    return <ClientDetailView {...props} id={id} />;
};

export default ClientDetailViewWrapper;
