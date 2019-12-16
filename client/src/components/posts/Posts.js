import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import {
  Header,
  Segment,
} from 'semantic-ui-react';

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Header as="h1" color="teal" textAlign="center">
      Feed
    </Header>
      <PostForm />
      <Segment stacked>
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </Segment>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
