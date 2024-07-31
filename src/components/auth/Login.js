import React, { Component } from "react";
import { Button, Form, Segment, Message, Grid, Image, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, Link } from "react-router-dom";
import { loginUser } from "../../actions/auth";

export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.loginUser(username, password);
    this.setState({
      username: "",
      password: "",
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }

    const { username, password } = this.state;

    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
          <Image src="logo192.png" size="small" centered />
          <Segment raised>

            <Header as="h2" color="blue" >
              Register New Account
            </Header>
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  onChange={this.onChange}
                  value={username}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={this.onChange}
                  value={password}
                />
              </Form.Field>
              <Button type="submit" primary fluid>
                Login
              </Button>
            </Form>
            <Message>
              Don't have an account? <Link to="/register">Register</Link>
            </Message>
          </Segment>
          {this.props.loading && (
            <Message>Loading...</Message>
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  loading: state.authReducer.loading,
  error: state.errorReducer,
  message: state.messageReducer,
});

export default connect(mapStateToProps, { loginUser })(Login);
