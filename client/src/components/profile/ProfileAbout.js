import React, { Fragment } from 'react';
import { List, Image, Segment, Header } from 'semantic-ui-react';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    featuredimg,
    location,
    web,
    user: { username, email },
  },
}) => (
  // TODO - TO-DO : pendiente separar cada cacho en su propio componente
  <div>
    {bio && (
      <Fragment>
        <Segment padded basic size="large">
          {bio}
        </Segment>
        <div className="line" />
      </Fragment>
    )}
    <Segment color="pink">
      <Header as="h5">Skills</Header>
      <List bulleted horizontal>
        {skills.map((skill, index) => (
          <List.Item>{skill}</List.Item>
        ))}
      </List>
    </Segment>
    <Segment color="olive">
      <Header as="h5">Mi obra favorita</Header>

      {featuredimg && (
        <div className="featured">
          <Image centered bordered src={featuredimg} alt="" />
        </div>
      )}
    </Segment>

    <Segment color="blue">
      <Header as="h5">Encuéntrame en...</Header>
      <List>
        {location && (
          <List.Item>
            <List.Content>
              <List.Icon name="marker" />
              {location}
            </List.Content>
          </List.Item>
        )}
        {email && (
          <List.Item>
            <List.Content>
              <List.Icon name="mail" />
              {email}
            </List.Content>
          </List.Item>
        )}
        {web &&
          web.map(each => (
            <List.Item>
              <List.Content>
              <List.Icon name="linkify" />
              <a href={`/${web}`}>{web}</a>
              </List.Content>
            </List.Item>
          ))}
      </List>
    </Segment>
  </div>
);

export default ProfileAbout;
