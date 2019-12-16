import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';
import {
  Button,
  Grid,
  Segment,
  Divider,
  Form,
  Header,
  Card,
} from 'semantic-ui-react';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Grid
            textAlign="left"
            style={{ height: '100vh' }}
            verticalAlign="middle"
          >
            <Grid.Column>
              <Header as="h1" color="teal" textAlign="center">
                Más gente molona
              </Header>
            <Segment padded stacked>

              <Card.Group centered itemsPerRow="3">
                {profiles.length > 0 ? (
                  profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <h4>No hemos encontrado perfiles...</h4>
                )}
              </Card.Group>
              </Segment>
            </Grid.Column>{' '}
          </Grid>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getProfiles },
)(Profiles);
