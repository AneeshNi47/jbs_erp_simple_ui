import React, { Component } from "react";
import { Button, Form, Grid, Card, StatisticValue, StatisticLabel, Statistic } from "semantic-ui-react";
import { connect } from "react-redux";
import { getItems } from "../../actions/crud_operations";
import { TASK_STATUS_TYPES, GET_PROJECTS } from "../../actions/types";
import ProjectListingTable from "./ProjectListingTable";

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
                  <StatisticLabel>Projects</StatisticLabel>
                </Statistic>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Statistic>
                  <StatisticValue>{completedProjects}</StatisticValue>
                  <StatisticLabel>Completed Projects</StatisticLabel>
                </Statistic>
              </Card>
            </Grid.Column>
            <Grid.Column>
              <Card>
                <Statistic>
                  <StatisticValue>{inProgressProjects}</StatisticValue>
                  <StatisticLabel>In Progress</StatisticLabel>
                </Statistic>
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

        <ProjectListingTable
          projects={projects}
          editProject={this.props.editProject}
          openAddProject={this.props.openAddProject}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.projectsReducer.projects,
});

export default connect(mapStateToProps, { getItems })(ListProjects);
