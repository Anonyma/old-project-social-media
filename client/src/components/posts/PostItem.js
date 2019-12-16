import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';
import { Image, Segment, Label, Button, Icon } from 'semantic-ui-react';

const PostItem = ({
  deletePost,
  auth,
  post: { _id, text, username, avatar, user, likes, comments },
  showActions,
}) => (
  <Segment stacked color="teal">
    <Link to={`/profile/${user}`}>
      <Label as="h4" image color="olive">
        <Image src={avatar} />
        {username}
      </Label>
    </Link>
    <div>
      <Segment basic size="large">{text}</Segment>

      {showActions && (
        <Fragment>
          <Button icon onClick={() => {}} type="button" color="olive">
            <Icon name="thumbs up" />
          </Button>
          <Button
            icon
            onClick={() => {}}
            type="button"
            color="pink"
          >
            <Icon name="thumbs down" />
          </Button>

          {!auth.loading && user === auth.user._id && (
            <Button
              icon
              onClick={() => deletePost(_id)}
              type="button"
              color="red"
            >
              <Icon name="delete" />
            </Button>
          )}
          <br />
          <Button
            as={Link}
            to={`/posts/${_id}`}
            basic
            style={{ marginTop: '1em' }}
          >
            Ver publicación
            <Label color="teal" circular style={{ marginLeft: '1em' }}>
              {comments.length > 0 && comments.length}
            </Label>
          </Button>
        </Fragment>
      )}
    </div>
  </Segment>
);

PostItem.defaultProps = {
  showActions: true,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { deletePost },
)(PostItem);
