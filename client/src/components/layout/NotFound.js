import React, { Fragment } from 'react';
import {
  Segment,
  Header,
} from 'semantic-ui-react';

const NotFound = () => {
  return (
    <Fragment>
    <Segment stacked>
    <Header as="h2">
    Página no encontrada
    </Header>
    <Header as="h4">
    Lo sentimos, esta página no existe :(
    </Header>
    </Segment>
    </Fragment>
  );
};

export default NotFound;
