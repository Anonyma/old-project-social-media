import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import {
  Button,
  Grid,
  Segment,
  Divider,
  Form,
  Header,
  TextArea,
} from 'semantic-ui-react';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    web: [],
    location: '',
    skills: '',
    bio: '',
    featuredimg: '',
    avatar: ''
  });

  const clearProfile = () =>
    (profile = {
      avatar: '',
      web: '',
      location: '',
      skills: [],
      bio: '',
      featuredimg: '',
    });

  useEffect(() => {
    getCurrentProfile();

    if (!profile) {
      clearProfile();
    }

    setFormData({
      avatar: loading || !profile.avatar ? '' : profile.avatar,
      web: loading || !profile.web ? '' : profile.web,
      location: loading || !profile.location ? '' : profile.location,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      featuredimg: loading || !profile.featuredimg ? '' : profile.featuredimg,
    });
  }, [loading, getCurrentProfile]);

  const handleUploadSuccessAvatar = filename => {
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => setFormData({ ...formData, avatar: url }))
      .catch(e => console.log(e));
  };

  const handleUploadSuccessFeatured = filename => {
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => setFormData({ ...formData, featuredimg: url }))
      .catch(e => console.log(e));
  };

  const { featuredimg, web, location, skills, bio, avatar } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 650 }}>
          <Header as="h2" color="teal" textAlign="center">
            Crea o edita tu perfil
          </Header>
          <Form size="large" onSubmit={onSubmit}>
            <Segment stacked>
              <div>
                <small>Cambia tu avatar</small>
                <FileUploader
                  accept="image/*"
                  name="avatar"
                  randomizeFilename
                  multiple
                  onUploadSuccess={handleUploadSuccessAvatar}
                  storageRef={firebase.storage().ref('images')}
                />
              </div>
              <Divider hidden />

              <small>Cuenta lo que quieras</small>
              <TextArea
                fluid
                name="bio"
                value={bio}
                placeholder="Introduce tu biografía"
                onChange={e => onChange(e)}
              />
              <Divider />
              <Form.Input
                fluid
                name="web"
                value={web}
                placeholder="Tu web"
                onChange={e => onChange(e)}
              />
              <Form.Input
                fluid
                name="location"
                value={location}
                placeholder="Ubicación"
                onChange={e => onChange(e)}
              />
              <small>
                Separa tus skills con comas (eg. HTML,CSS,JavaScript,PHP)
              </small>
              <Form.Input
                fluid
                placeholder="Skills"
                name="skills"
                value={skills}
                onChange={e => onChange(e)}
              />
              <div>
                <small>Muestra el trabajo del que estás más orgulloso</small>
                <FileUploader
                  accept="image/*"
                  name="featuredimg"
                  randomizeFilename
                  multiple
                  onUploadSuccess={handleUploadSuccessFeatured}
                  storageRef={firebase.storage().ref('images')}
                />
              </div>
              <Divider />

              <Button
                type="submit"
                color="teal"
                fluid
                size="small"
                value="CrearPerfil"
              >
                Crear perfil
              </Button>
            </Segment>
          </Form>
          <Divider hidden />

          <Button as={Link} basic color="olive" to="/dashboard">
            Volver
          </Button>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile },
)(withRouter(EditProfile));
