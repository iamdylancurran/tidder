import React, { useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PostCard from '../components/PostCard';

const api = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const fetchHomepage = async () => {
  const res = await axios.get(`${api}/home/hot`, { withCredentials: true });
  const { data } = res;
  return data;
};

const Home = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  React.useEffect(() => {
    setLoading(true);
    fetchHomepage().then((items) => {
      setPosts(items);
      setLoading(false);
    });
  }, []);

  return (
    <div className={classes.root}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth="md">
          <Grid container direction="row" justify="center" alignItems="center">
            {posts.map((post) => (
              <Grid item xs={12} key={post.id}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
};

export default Home;
