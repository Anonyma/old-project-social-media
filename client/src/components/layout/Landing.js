import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './logo.png';
import {
  Segment,
  Header,
  Image,
  Button,
  Grid,
  Divider
} from 'semantic-ui-react';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={logo} /> DAW proyecto
        </Header>
        <Divider hidden />

        <Segment stacked>
          <Button
            as={Link}
            color="teal"
            to="/register"
            fluid
            size="large"
            value="Register"
          >
            Registro
          </Button>
          <Divider hidden />
          <Button
            as={Link}
            color="teal"
            to="/login"
            fluid
            size="large"
            value="Login"
          >
            Login
          </Button>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
