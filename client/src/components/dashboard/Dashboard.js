import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { Container, Grid, Button, Divider, Header, Segment, Image } from 'semantic-ui-react';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user, isAuthenticated },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return loading && profile === undefined ? (
    <Spinner />
  ) : (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 450 }}>

    <Container>
    <Header as="h3">Tu espacio</Header>
      {user && (<Segment color="pink" padded>
        <Image centered src={user.avatar} alt="Avatar" size='small'/>
        <Header as="h3">Bienvenid@ {user.username}</Header>
        </Segment>)}
      {profile !== null || profile !== undefined ? (
        <Fragment>
          <DashboardActions />
          <Divider hidden />
            <button className='ui red button' onClick={() => deleteAccount()}>
              Eliminar cuenta
            </button>
        </Fragment>
      ) : (
        <Fragment>
          <p>Todavía no has creado tu perfil</p>
          <Button as={Link} to='/create-profile' className='ui teal button'>
            Crear perfil
          </Button>
        </Fragment>
      )}
    </Container>
    </Grid.Column></Grid>
  );
};

// Con esto pasamos como parámetros al comp. variables que se encuentran en el estado global (la Redux store)
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

// Esto ejecuta la "fusión" - inserta las variables de estado (y en este caso imports de "acciones") que hemos indicado en nuestro componente
export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
