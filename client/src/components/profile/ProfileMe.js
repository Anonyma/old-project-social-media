import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getCurrentProfile } from '../../actions/profile';
import { Button, Grid, Segment, Divider, Container } from 'semantic-ui-react';

const Profile = ({
  getCurrentProfile,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  if (!profile) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <Divider hidden />
      <Grid centered container padded>
        <Grid.Column centered>
          <Segment piled>
            <Container textAlign="center">
              {profile === null || loading ? (
                <Spinner />
              ) : (
                <Fragment>
                  <Button as={Link} to="/profiles" basic color="teal">
                    Ver otros perfiles
                  </Button>

                  {/* Si el perfil pertenece a quien está viéndolo, le mostramos la opción de editarlo */}
                  {auth.isAuthenticated &&
                    auth.loading === false &&
                    auth.user._id === profile.user._id && (
                      <Link to="/edit-profile" className="ui button teal">
                        Editar Perfil
                      </Link>
                    )}
                  <Divider hidden />
                  <div>
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                  </div>
                </Fragment>
              )}
            </Container>
          </Segment>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getCurrentProfile },
)(Profile);
