import React from 'react';
import { Divider, Header, Image, Container } from 'semantic-ui-react';

const ProfileTop = ({
  profile: {
    location,
    web,
    user: { username, avatar },
  },
}) => {
  return (
    <Container>
      {username && <Header as="h3">
        Perfil de {username}
      </Header>}
      {avatar && <Image src={avatar} alt="Foto de perfil" circular centered size='small'/>}
      <Divider hidden />
    </Container>
  );
};

export default ProfileTop;
