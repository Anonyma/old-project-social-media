import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import logo from './logo.png';
import {
  Segment,
  Header,
  Image,
  Form,
  Button,
  Message,
  Grid,
} from 'semantic-ui-react';

// Este es el componente que se carga al acceder al login
const Login = ({ login, isAuthenticated }) => {
  // Esto es un React Hook - es una forma de tener estado local en un componente-función
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={logo} /> Entra a tu cuenta
        </Header>
        <Form size="large" onSubmit={onSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              name="email"
              value={email}
              required
              iconPosition="left"
              placeholder="E-mail address"
              onChange={e => onChange(e)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={e => onChange(e)}
              minLength="6"
            />

            <Button
            type="submit"
              color="teal"
              fluid
              size="large"
              value="Login"
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Message compact color="olive">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

// Con esto pasamos como parámetros variables que se encuentran en el estado global (la Redux store)
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// Esto ejecuta la "fusión" - inserta las variables de estado que hemos indicado en nuestro componente
export default connect(
  mapStateToProps,
  { login },
)(Login);
