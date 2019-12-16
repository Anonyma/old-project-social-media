import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';
import {
  Button, Segment, Divider
} from 'semantic-ui-react';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Segment>
      <Button
        as={Link}
        to="/posts"
        basic
        color="teal"
        size="small"
        value="VolverFeed"
      >
        Volver al feed
      </Button>
      <PostItem post={post} showActions={false} />
      <Divider hidden />
      <CommentForm postId={post._id} />
      <Divider hidden />
      <div>
        {post.comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Segment>
  );
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  { getPost },
)(Post);
