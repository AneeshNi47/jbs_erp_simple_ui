import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetailView from './ProjectDetailed';

const ProjectDetailViewWrapper = (props) => {
    const { id } = useParams();
    return <ProjectDetailView {...props} id={id} />;
};

export default ProjectDetailViewWrapper;
