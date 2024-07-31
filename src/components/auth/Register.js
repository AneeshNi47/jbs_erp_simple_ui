import React, { Component } from "react";
import { Button, Form, Segment, Message, Grid, Header, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, Link } from "react-router-dom";
import { registerUser } from "../../actions/auth";

export class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  static propTypes = {
    registerUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
  };

  componentDidMount() {
    console.log(this.props);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, confirm_password } = this.state;
    if (password !== confirm_password) {
      // You might want to handle this case
      alert("Passwords do not match");
      return;
    }
    this.props.registerUser({ username, email, password });
    this.setState({
      username: "",
      password: "",
      email: "",
      confirm_password: "",
    });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }

    const { username, password, confirm_password, email } = this.state;

    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
          <Image src="logo192.png" size="small" centered />
          <Segment raised>
            <Header as="h2" color="teal" >
              Register New Account
            </Header>
            <Form size="large" onSubmit={this.onSubmit}>
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  name="username"
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  name="password"
                  onChange={this.onChange}
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirm_password}
                  name="confirm_password"
                  onChange={this.onChange}
                />
              </Form.Field>
              <Button type="submit" color="teal" fluid size="large">
                Register
              </Button>
            </Form>
          </Segment>
          <Message>
            Already have an account? <Link to="/login">Login</Link>
          </Message>
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

export default connect(mapStateToProps, { registerUser })(Register);
