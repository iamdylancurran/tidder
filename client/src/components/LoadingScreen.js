import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const LoadingScreen = ({ height }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={height}
      >
        <CircularProgress color="primary" />
      </Box>
    </div>
  );
};

LoadingScreen.propTypes = {
  height: PropTypes.string.isRequired,
};

export default LoadingScreen;
