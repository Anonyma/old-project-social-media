import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import {
  Button,
  Form,
  Header,
  TextArea,
} from 'semantic-ui-react';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <div>
      <div>
      <Header as="h3" color="teal" textAlign="center">
      Deja un comentario
    </Header>
      </div>
      <Form
        onSubmit={e => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <TextArea
          name='text'
          placeholder='Comentario'
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
        Enviar
      </Button>
      </Form>
    </div>
  );
};


export default connect(
  null,
  { addComment }
)(CommentForm);
