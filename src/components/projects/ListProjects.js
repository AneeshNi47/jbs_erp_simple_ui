import React, { Component } from "react";
import { Button, Table, Form, Grid, Card,StatisticValue, StatisticLabel, Statistic } from "semantic-ui-react";
import { connect } from "react-redux";
import { getItems } from "../../actions/crud_operations";
import { TASK_STATUS_TYPES, GET_PROJECTS } from "../../actions/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export class ListProjects extends Component {
  state = {
    statusFilter: 0,
  };

  componentDidMount() {
    this.props.getItems(GET_PROJECTS, "user-projects", "status", null);
  }

  onChange = (e) => {
    this.setState({ statusFilter: e.target.value });
    this.props.getItems(
      GET_PROJECTS,
      "user-projects",
      "status",
      e.target.value === "8" ? null : e.target.value
    );
  };

  render() {
    const { statusFilter } = this.state;
    const { projects } = this.props;

    // Count different types of projects
    const totalProjects = projects.length;
    const completedProjects = projects.filter(
      (project) => project.status === 2
    ).length;
    const inProgressProjects = projects.filter(
      (project) => project.status === 1
    ).length;
    return (
      <>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Card>
              <Statistic>
    <StatisticValue>{totalProjects}</StatisticValue>
    <StatisticLabel>Downloads</StatisticLabel>
  </Statistic>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>Completed Projects</Card.Header>
                  <Card.Description>{completedProjects}</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Card.Content>
                  <Card.Header>In Progress Projects</Card.Header>
                  <Card.Description>{inProgressProjects}</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid>
          <Grid.Row columns={3} verticalAlign="middle">
            <Grid.Column>
              <h3>Projects</h3>
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
                    <option value={'Planning'}>{TASK_STATUS_TYPES['planning']}</option>
                    <option value={'In Progress'}>{TASK_STATUS_TYPES['in_progress']}</option>
                    <option value={'Completed'}>{TASK_STATUS_TYPES['completed']}</option>
                    <option value={'On Hold'}>{TASK_STATUS_TYPES['on_hold']}</option>
                    <option value={9}>Trash</option>
                  </select>
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column textAlign="right">

            <Button primary onClick={this.props.openAddProject} icon>
            Add Project 
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {projects.map((project, index) => (
              <Table.Row key={project.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{project.name}</Table.Cell>
                <Table.Cell>{project.description}</Table.Cell>
                <Table.Cell>{TASK_STATUS_TYPES[project.status]}</Table.Cell>
                <Table.Cell>
                  <Button
                    icon
                    color="yellow"
                    onClick={() => this.props.editProject(project)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button icon color="red" onClick={this.props.openAddProject}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projectsReducer.projects,
});

export default connect(mapStateToProps, { getItems })(ListProjects);
