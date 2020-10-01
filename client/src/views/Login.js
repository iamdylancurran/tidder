import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SignInWithReddit from '../components/SignInWithReddit';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Login = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12}>
            <Typography
              variant="h1"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Tidder
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="textPrimary"
              paragraph
            >
              Tidder is a minimalist take on Reddit. It removes all the bloat
              and crap that&apos;s been added over the years, and brings it back
              to its roots.
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '1rem' }}>
            <SignInWithReddit />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
