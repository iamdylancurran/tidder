import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LoadingScreen from '../components/LoadingScreen';
import PostCard from '../components/PostCard';
import NavBar from '../components/NavBar';
import usePageBottom, { checkIfPageBottom } from '../hooks/usePageBottom';

const api = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

const Home = () => {
  const classes = useStyles();
  const { category } = useParams();

  const fetchPosts = async (key, nextPage = '') => {
    const params = `?&after=${nextPage}`;
    const res = await axios.get(`${api}/home/${category}${params}`, {
      withCredentials: true,
    });
    const { data } = res;
    return data;
  };

  const {
    status,
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery('posts', fetchPosts, {
    getFetchMore: (lastGroup, allGroups) =>
      lastGroup[lastGroup.length - 1].name,
  });

  // Triggers a fetch of the next page on scroll to bottom
  const isPageBottom = usePageBottom();
  useEffect(() => {
    if (
      !isPageBottom ||
      isFetching ||
      isFetchingMore ||
      !canFetchMore ||
      !checkIfPageBottom()
    ) {
      return;
    }

    fetchMore();
  }, [isPageBottom, fetchMore, isFetching, isFetchingMore, canFetchMore]);

  return (
    <div className={classes.root}>
      {status === 'loading' ? (
        <LoadingScreen height="100vh" />
      ) : (
        <>
          <NavBar category={category} />
          <Container maxWidth="md">
            {data.map((group, i) => (
              <React.Fragment key={i}>
                {group.map((post) => (
                  <React.Fragment key={post.id}>
                    <PostCard post={post} />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </Container>
        </>
      )}
      <div style={{ height: '15vh' }}>
        {isFetchingMore ? <LoadingScreen height="15vh" /> : <></>}
      </div>
    </div>
  );
};

export default Home;
