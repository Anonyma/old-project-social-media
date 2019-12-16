import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/post';
import {
  Button,
  Segment,
  Icon,
  Label,
  Image,
} from 'semantic-ui-react';

const CommentItem = ({
  postId,
  comment: { _id, text, username, avatar, user },
  auth,
  deleteComment
}) => (
  <Segment stacked padded>
    <div>
    <Link to={`/profile/${user}`}>
      <Label as="h4" image color="olive">
        <Image src={avatar} />
        {username}
      </Label>
    </Link>
    </div>
    <div>
      <Segment basic style={{marginLeft: '-10px'}}>{text}</Segment>
      {!auth.loading && user === auth.user._id && (
        <Button
          onClick={() => deleteComment(postId, _id)}
          color="red"
          icon
        >
        <Icon name="delete" />
        </Button>
      )}
    </div>
  </Segment>
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
