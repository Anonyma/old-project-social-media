import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import {
  Button,
  Segment,
  Divider,
  Form,
  Header,
  TextArea,
} from 'semantic-ui-react';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <Segment stacked compact>
      <div>
        <Header as="h3" color="teal" textAlign="center">
        Crea un post
      </Header>
      </div>
      <Divider hidden />

      <Form
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <TextArea
          name='text'
          placeholder='Cuenta algo'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <Button
        type="submit"
        color="teal"
        fluid
        size="small"
        value="CrearPost"
      >
        Crear post
      </Button>
      </Form>
    </Segment>
  );
};

export default connect(
  null,
  { addPost }
)(PostForm);
