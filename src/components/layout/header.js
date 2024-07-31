import React, { Component } from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/auth";

class HeaderTopBar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    return (
      <Menu>
        <Menu.Item>
          <Icon name="sidebar" onClick={this.props.toggleSidebar} />
        </Menu.Item>
        <Menu.Item header>JBS ERP</Menu.Item>
        {this.props.auth.isAuthenticated && (
          <Menu.Menu position="right">
            <Dropdown item text={this.props.auth.user.username}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logoutUser })(HeaderTopBar);
