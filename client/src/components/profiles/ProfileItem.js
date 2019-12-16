import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Card, Button, Label } from 'semantic-ui-react';

const ProfileItem = ({
  profile: {
    user: { _id, username, avatar },
    location,
    skills,
    bio,
  },
}) => {
  if (bio.length > 40) {
    bio = bio.substring(0,39)+'...'
  }
  
  return (
    <div>
      <Card color="pink " style={{margin: '1em'}}>
        <Image src={avatar} circular wrapped ui={false} />
        <Card.Content>
          <Card.Header style={{padding: "0.3em"}}>{username}</Card.Header>
          <Card.Meta>
            <Label as="a" color="olive" ribbon>
              {location && <span>{location}</span>}
            </Label>
          </Card.Meta>
          <Card.Description>{bio && bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color="teal" as={Link} to={`/profile/${_id}`}>
            Ver perfil
          </Button>
        </Card.Content>
      </Card>
    </div>
  );
};

export default ProfileItem;
