import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import firebase from 'firebase/app';
import 'firebase/storage';
import FileUploader from 'react-firebase-file-uploader';
import {
  Button,
  Grid,
  Segment,
  Form,
  Header,
  TextArea,
} from 'semantic-ui-react';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    web: [],
    location: '',
    skills: '',
    bio: '',
    featuredimg: '',
  });

  const handleUploadSuccess = filename => {
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then(url => setFormData({ ...formData, featuredimg: url }))
      .catch(e => console.log(e));
  };

  const { featuredimg, web, location, skills, bio } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <Fragment>
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Crea tu perfil
          </Header>
          <Form size="large" onSubmit={onSubmit}>
            <Segment stacked>
              <small>Cuenta lo que quieras</small>
              <TextArea
                fluid
                name="bio"
                value={bio}
                placeholder="Introduce tu biografía"
                onChange={e => onChange(e)}
              />
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
                <small>
                  Muestra el trabajo del que estás más orgulloso
                </small>
                <FileUploader
                  accept="image/*"
                  name="featuredimg"
                  randomizeFilename
                  multiple
                  onUploadSuccess={handleUploadSuccess}
                  storageRef={firebase.storage().ref('images')}
                />
              </div>

              <Button
                type="submit"
                color="teal"
                fluid
                size="large"
                value="CrearPerfil"
              >
                Crear perfil
              </Button>
            </Segment>
          </Form>
          <Button as={Link} to="/dashboard">
            Volver
          </Button>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default connect(
  null,
  { createProfile },
)(withRouter(CreateProfile));
