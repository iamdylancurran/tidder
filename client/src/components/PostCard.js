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
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import ExpandIcon from '@material-ui/icons/ExpandMoreRounded';
import ShrinkIcon from '@material-ui/icons/ExpandLessRounded';
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

  const cardHeaderElementConfig = {
    variant: 'body2',
    display: 'inline',
    color: 'textSecondary',
    className: classes.cardHeaderElement,
  };

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
          <Typography {...cardHeaderElementConfig} color="secondary">
            {post.subreddit}
          </Typography>
          <Typography {...cardHeaderElementConfig}>
            • {post.author} •
          </Typography>
          <Typography {...cardHeaderElementConfig}>
            {TimeSince(post.created_utc)} •
          </Typography>
          <Typography {...cardHeaderElementConfig}>
            {post.post_hint || 'self'}
          </Typography>
        </Box>

        <Grid container direction="row">
          <Grid item xs={12}>
            {post.post_hint === 'link' ? (
              <Link href={post.url} underline="none" taget="_blank">
                <Typography variant="body1" color="textPrimary" paragraph>
                  {post.title}
                </Typography>
              </Link>
            ) : (
              <>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  paragraph={Boolean(post.is_self)}
                >
                  {post.title}
                </Typography>
                {post.post_hint !== 'link' && !post.is_self && (
                  <IconButton
                    color="primary"
                    edge="start"
                    onClick={() => setShowContent(!showContent)}
                  >
                    {showContent ? <ShrinkIcon /> : <ExpandIcon />}
                  </IconButton>
                )}
              </>
            )}
          </Grid>

          <Grid item xs={12}>
            {SwitchPostType()}
          </Grid>
        </Grid>

        <Box display="flex" style={{ paddingTop: '1rem' }}>
          <Box
            display="flex"
            alignItems="center"
            className={classes.contentActionsSection}
          >
            <CommentIcon edge="start" className={classes.contentActionsIcons} />
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

const SelfContent = ({ showContent, setShowContent, post }) => {
  return (
    <Box
      display="flex"
      flexGrow={1}
      onClick={() => setShowContent(!showContent)}
    >
      {showContent && post.selftext ? (
        <Markdown noWrap={!showContent}>{post.selftext}</Markdown>
      ) : (
        <Typography variant="body2" color="textPrimary" noWrap>
          {post.selftext}
        </Typography>
      )}
    </Box>
  );
};

const ImageContent = ({ showContent, post }) => {
  const classes = useStyles();
  return (
    <>
      {showContent ? (
        <img
          src={post.url || post.preview.images[0].source.url}
          className={classes.cardImage}
          alt={post.title}
        />
      ) : null}
    </>
  );
};

const RichVideoContent = ({ showContent, post }) => {
  return (
    <>{showContent ? <>{ReactHtmlParser(post.media_embed.content)}</> : null}</>
  );
};

const HostedVideoContent = ({ showContent, post }) => {
  return (
    <>
      {showContent ? (
        <video src={post.media.reddit_video.scrubber_media_url} />
      ) : null}
    </>
  );
};

export default PostCard;
