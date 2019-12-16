import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Container, Menu, Image, Icon } from 'semantic-ui-react';
import logo from './logo.png';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  // Estos son los links que se muestran si el usuario está loggeado
  const authLinks = (
    <div>
    <Menu fixed="top">
      <Container>
        <Menu.Item as={Link} to="/" header>
          <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
          DevArt
        </Menu.Item>
        <Menu.Item as={Link} name="feed" to="/posts">
          <Icon name="bullhorn" color="grey" />
          Feed
        </Menu.Item>
        <Menu.Item as={Link} name="profile" to="/profiles">
          <Icon name="users" color="grey" />
          Gente
        </Menu.Item>
        <Menu.Item as={Link} name="dashboard" to="/dashboard">
          <Icon name="write" color="grey" />
          Mi dashboard
        </Menu.Item>
        <Menu.Item as='a' name="logout" onClick={logout} to="/login">
          <Icon name="code branch" color="grey" />
          Logout
        </Menu.Item>
      </Container>
    </Menu>
    </div>

  );
  // Estos son los links que se muestran si el usuario no está loggeado
  const guestLinks = (
    <Menu fixed="top">
      <Container>
        <Menu.Item as="a" header>
          <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
          DevArt
        </Menu.Item>
        <Menu.Item as={Link} name="profile" to="profiles">
          <Icon name="user" />
          Perfiles
        </Menu.Item>
        <Menu.Item as={Link} name="register" to="/register">
          <Icon name="user" />
          Registro
        </Menu.Item>
        <Menu.Item as={Link} name="login" to="/login">
          <Icon name="user" />
          Login
        </Menu.Item>
      </Container>
    </Menu>
  );
  // Lógica: Si el estado NO es "loading", muestra un componente u otro según el usuario está loggeado o no
  return (
    <Menu>
      <h1>
        <Link to="/">DevArt</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Menu>
  );
};

// Esto se usa para pasar las variables del estado como "props" a los siguientes componentes
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout },
)(Navbar);
