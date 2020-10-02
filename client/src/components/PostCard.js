import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TimeSince from '../utils/TimeSince';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: 0,
    borderBottom: '1px solid rgba(0,0,0,0.12)',
    padding: theme.spacing(0.5),
  },
  circleSubredditImage: {
    borderRadius: '50%',
    width: '64px',
    height: 'auto',
    marginRight: theme.spacing(1),
  },
  cardImage: {
    width: '80%',
    height: 'auto',
    margin: '0 auto',
  },
  headerBox: {
    marginBottom: theme.spacing(2),
  },
}));

function SwitchPostType(post, classes) {
  if (post.is_self) {
    return (
      <Typography variant="body2" color="textSecondary" noWrap paragraph>
        {post.selftext}
      </Typography>
    );
  }
  switch (post.post_hint) {
    case 'image':
      return (
        <img
          src={post.preview.images[0].source.url}
          className={classes.cardImage}
          alt="Unable to designate alts."
        />
      );
    case 'link':
      return <p>link</p>;
    case 'rich:video':
      return <p>rich video</p>;
    case 'hosted:video':
      return <p>hosted video</p>;
    case 'self':
      return <p>self</p>;
    default:
      break;
  }
}

const PostCard = ({ post }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" alignItems="center" className={classes.headerBox}>
          <img
            alt="Unfortunately unable to assign alts."
            src={post.sr_detail.icon_img || '/images/null_reddit_sr_icon.png'}
            className={classes.circleSubredditImage}
          />
          <Box>
            <Typography variant="body2" color="secondary">
              {post.subreddit}
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
              style={{ display: 'inline-block', marginRight: '0.5rem' }}
            >
              {post.author} •{' '}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ display: 'inline-block' }}
            >
              {TimeSince(post.created_utc)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" color="textPrimary" paragraph>
          {post.title}
        </Typography>

        {SwitchPostType(post, classes)}
      </CardContent>
    </Card>
  );
};

export default PostCard;
