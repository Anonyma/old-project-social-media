import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { Header, Image, Segment, Form, Button, Message, Grid } from 'semantic-ui-react';
import logo from './logo.png';


const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ username, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (

    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <Image src={logo} /> Crea una cuenta
        </Header>
        <Form size="large" onSubmit={e => onSubmit(e)}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              name="username"
              value={username}
              required
              iconPosition="left"
              placeholder="Nombre de usuario"
              onChange={e => onChange(e)}
            />
            <Form.Input
              fluid
              icon="user"
              type="email"
              name="email"
              value={email}
              required
              iconPosition="left"
              placeholder="E-mail"
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
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Repite tu password"
              type="password"
              name="password2"
              value={password2}
              onChange={e => onChange(e)}
              minLength="6"
            />

            <Button
            type="submit"
              color="teal"
              fluid
              size="large"
              value="Register"
            >
              Registrar
            </Button>
          </Segment>
        </Form>
        <Message color="olive" compact>
          ¿Ya tienes cuenta? <Link to="/login">Entra</Link>
        </Message>
      </Grid.Column>
    </Grid>
    
  );
};

// Con esto pasamos como parámetros variables que se encuentran en el estado global (la Redux store)
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// Esto ejecuta la "fusión" - inserta las variables de estado que hemos indicado en nuestro componente
export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
