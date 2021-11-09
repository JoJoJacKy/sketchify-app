import { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import { commentPost } from '../../actions/posts';

// Passing in the post data
const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    setComment('');

    // Scrolling towards new comment
    // commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          {/* Loops through Comments */}
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((comment, index) => (
            <Typography
              key={index}
              gutterBottom
              variant="subtitle1"
              style={{ wordWrap: 'break-word' }}
              maxWidth="500px"
            >
              <strong>{comment.split(':')[0]}</strong>
              {comment.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: '100%' }}>
            <Typography gutterButtom variant="h6">
              Leave a nice comment
            </Typography>
            <TextField
              fullWidth
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment}
              variant="contained"
              onClick={handleClick}
              color="primary"
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
