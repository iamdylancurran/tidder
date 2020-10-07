import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ReactHtmlParser from 'react-html-parser';
import Markdown from '../utils/Markdown';
import TimeSince from '../utils/TimeSince';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    borderRadius: 0,
    borderBottom: '2px solid rgba(0,0,0,0.12)',
    padding: theme.spacing(0.1, 0.5),
  },
  cardContent: {
    '&:last-child': {
      paddingBottom: theme.spacing(0.5),
    },
  },
  circleSubredditImage: {
    borderRadius: '50%',
    width: '64px',
    height: 'auto',
    marginRight: theme.spacing(1),
  },
  cardPreviewImage: {
    width: '100%',
    height: 'auto',
    margin: '0 auto',
    cursor: 'pointer',
  },
  cardImage: {
    width: '100%',
    height: 'auto',
    margin: '0 auto',
    paddingTop: '2rem',
  },
  cardHeaderBox: {
    marginBottom: theme.spacing(1),
  },
  cardHeaderElement: {
    marginRight: theme.spacing(0.5),
  },
  contentActionsSection: {
    marginRight: '1em',
  },
  contentActionsIcons: {
    color: theme.palette.text.secondary,
    height: '1.3rem',
  },
}));

const PostCard = ({ post }) => {
  const classes = useStyles();
  const [showContent, setShowContent] = useState(false);

  function SwitchPostType() {
    if (post.is_self) {
      return (
        <SelfContent
          showContent={showContent}
          setShowContent={setShowContent}
          post={post}
        />
      );
    }
    switch (post.post_hint) {
      case 'image':
        return (
          <ImageContent
            showContent={showContent}
            setShowContent={setShowContent}
            post={post}
          />
        );
      case 'link':
        return <LinkContent post={post} />;
      case 'rich:video':
        return (
          <RichVideoContent
            showContent={showContent}
            setShowContent={setShowContent}
            post={post}
          />
        );
      case 'hosted:video':
        return (
          <HostedVideoContent
            showContent={showContent}
            setShowContent={setShowContent}
            post={post}
          />
        );
      default:
        break;
    }
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box
          display="flex"
          flexGrow={1}
          alignItems="center"
          className={classes.cardHeaderBox}
        >
          <Avatar
            src={post.sr_detail.icon_img || '/images/null_reddit_sr_icon.png'}
            className={classes.cardHeaderElement}
          />
          <Typography
            variant="body2"
            color="secondary"
            display="inline"
            className={classes.cardHeaderElement}
          >
            {post.subreddit}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            display="inline"
            className={classes.cardHeaderElement}
          >
            • {post.author} •
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            display="inline"
            className={classes.cardHeaderElement}
          >
            {TimeSince(post.created_utc)}
          </Typography>
        </Box>

        {SwitchPostType()}

        <Box display="flex" style={{ paddingTop: '1rem' }}>
          <Box
            display="flex"
            alignItems="center"
            className={classes.contentActionsSection}
          >
            <CommentIcon className={classes.contentActionsIcons} />
            <Typography variant="body2" color="textSecondary" display="inline">
              {post.num_comments} Comments
            </Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            className={classes.contentActionsSection}
          >
            <ShareIcon className={classes.contentActionsIcons} />
            <Typography variant="body2" color="textSecondary" display="inline">
              Share
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Title = ({ title }) => {
  return (
    <Typography variant="body1" color="textPrimary" paragraph>
      {title}
    </Typography>
  );
};

const SelfContent = ({ showContent, setShowContent, post }) => {
  return (
    <Box>
      <Typography variant="body1" color="textPrimary" paragraph>
        {post.title}
      </Typography>
      <Box
        style={{ paddingTop: '1rem' }}
        onClick={() => setShowContent(!showContent)}
      >
        {showContent ? (
          <Markdown noWrap={!showContent}>{post.selftext}</Markdown>
        ) : (
          <Typography variant="body2" color="textPrimary" noWrap>
            {post.selftext}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const ImageContent = ({ showContent, setShowContent, post }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Grid item xs={10} sm={11}>
        <Typography variant="body1" color="textPrimary" paragraph>
          {post.title}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => setShowContent(!showContent)}
          startIcon={showContent ? <RemoveIcon /> : <AddIcon />}
        >
          {showContent ? 'Hide Image' : 'Reveal Image'}
        </Button>
      </Grid>
      <Grid item xs={2} sm={1} onClick={() => setShowContent(!showContent)}>
        <img
          src={post.preview.images[0].resolutions[0].url}
          className={classes.cardPreviewImage}
          alt={post.title}
        />
      </Grid>
      {showContent ? (
        <img
          src={post.url || post.preview.images[0].source.url}
          className={classes.cardImage}
          alt={post.title}
        />
      ) : null}
    </Grid>
  );
};

const RichVideoContent = ({ showContent, setShowContent, post }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Grid item xs={10} sm={11}>
        <Typography variant="body1" color="textPrimary" paragraph>
          {post.title}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => setShowContent(!showContent)}
          startIcon={showContent ? <RemoveIcon /> : <AddIcon />}
        >
          {showContent ? 'Hide Video' : 'Reveal Video'}
        </Button>
      </Grid>
      <Grid item xs={2} sm={1} onClick={() => setShowContent(!showContent)}>
        <img
          src={post.preview.images[0].resolutions[0].url}
          className={classes.cardPreviewImage}
          alt={post.title}
        />
      </Grid>
      {showContent ? <>{ReactHtmlParser(post.media_embed.content)}</> : null}
    </Grid>
  );
};

const LinkContent = ({ post }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Grid item xs={10} sm={11}>
        <Link href={post.url} underline="none" target="_blank">
          <Typography variant="body1" color="textPrimary" paragraph>
            {post.title}
          </Typography>
        </Link>
      </Grid>
      <Grid item xs={2} sm={1}>
        <img
          src={post.preview.images[0].resolutions[0].url}
          className={classes.cardPreviewImage}
          alt={post.title}
        />
      </Grid>
    </Grid>
  );
};

const HostedVideoContent = ({ showContent, setShowContent, post }) => {
  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Grid item xs={10} sm={11}>
        <Typography variant="body1" color="textPrimary" paragraph>
          {post.title}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => setShowContent(!showContent)}
          startIcon={showContent ? <RemoveIcon /> : <AddIcon />}
        >
          {showContent ? 'Hide Video' : 'Reveal Video'}
        </Button>
      </Grid>
      <Grid item xs={2} sm={1} onClick={() => setShowContent(!showContent)}>
        <img
          src={post.preview.images[0].resolutions[0].url}
          className={classes.cardPreviewImage}
          alt={post.title}
        />
      </Grid>
      {showContent ? (
        <video src={post.media.reddit_video.scrubber_media_url} />
      ) : null}
    </Grid>
  );
};

export default PostCard;
