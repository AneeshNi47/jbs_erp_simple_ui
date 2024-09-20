import React from "react";
import ListingTable from "../ListingTable";
import { TASK_STATUS_TYPES } from "../../actions/types";

const ProjectListing = ({ projects, editProject, deleteProject }) => {
    const headers = ["#", "Title", "Description", "Status"];
    const fieldKeys = ["id", "name", "description", "status"];

    // Map status to human-readable text
    const projectsWithStatusText = projects.map(project => ({
        ...project,
        status: TASK_STATUS_TYPES[project.status]
    }));

    return (
        <ListingTable
            items={projectsWithStatusText}
            headers={headers}
            fieldKeys={fieldKeys}
            editItem={editProject}
            deleteItem={deleteProject}
            viewLinkBase="/project-view"
        />
    );
};

export default ProjectListing;
