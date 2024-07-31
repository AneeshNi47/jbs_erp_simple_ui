import React, { useState } from "react";
import { Sidebar, Menu, Icon, Segment } from "semantic-ui-react";
import HeaderTopBar from "./components/layout/header";
import TaskDashboard from "./components/tasks/TaskDashboard";
import ProjectDashboard from "./components/projects/ProjectDashboard";
import ClientDashboard from "./components/clients/ClientDashboard";
import HomeDashboard from "./components/dashboard/HomeDashboard";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/layout/PrivateRoute";
import { connect } from "react-redux";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = ({ auth }) => {
  const [visible, setVisible] = useState(false);

  const toggleSidebar = () => setVisible(!visible);

  const closeSidebar = () => setVisible(false);

  return (
    <Router>
      {auth && auth.isAuthenticated && <HeaderTopBar toggleSidebar={toggleSidebar} />}
      <Sidebar.Pushable as={Segment} style={{ minHeight: '100vh' }}>
        {auth && auth.isAuthenticated && (
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible={visible}
            width="thin"
          >
            <Menu.Item as="a" href="#/" onClick={closeSidebar}>
              <Icon name="home" />
              Home
            </Menu.Item>
            <Menu.Item as="a" href="#/clients" onClick={closeSidebar}>
              <Icon name="users" />
              Clients
            </Menu.Item>
            <Menu.Item as="a" href="#/projects" onClick={closeSidebar}>
              <Icon name="tasks" />
              Projects
            </Menu.Item>
            <Menu.Item as="a" href="#/labour" onClick={closeSidebar}>
              <Icon name="briefcase" />
              Labour
            </Menu.Item>
            <Menu.Item as="a" href="#/suppliers" onClick={closeSidebar}>
              <Icon name="shipping" />
              Suppliers
            </Menu.Item>
            <Menu.Item as="a" href="#/contractors" onClick={closeSidebar}>
              <Icon name="building" />
              Contractors
            </Menu.Item>
            <Menu.Item as="a" href="#/contractors" onClick={closeSidebar}>
              <Icon name="users" />
              Users
            </Menu.Item>
          </Sidebar>
        )}

        <Sidebar.Pusher>
          <Segment basic>
            <div className="container">
              <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/" element={<PrivateRoute element={HomeDashboard} />} />
                <Route path="/tasks" element={<PrivateRoute element={TaskDashboard} />} />
                <Route path="/projects" element={<PrivateRoute element={ProjectDashboard} />} />
                <Route path="/clients" element={<PrivateRoute element={ClientDashboard} />} />
              </Routes>
            </div>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(App);
