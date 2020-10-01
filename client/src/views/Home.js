import React, { useState } from 'react';
import axios from 'axios';
import LoadingScreen from '../components/LoadingScreen';

const api = process.env.REACT_APP_API_URL;

const fetchHomepage = async () => {
  const res = await axios.get(`${api}/home/hot`, { withCredentials: true });
  const { data } = res;
  return data;
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  React.useEffect(() => {
    setLoading(true);
    fetchHomepage().then((items) => {
      setPosts(items);
      setLoading(false);
    });
  }, []);

  return <div>{loading ? <LoadingScreen /> : <p>{posts[0].title}</p>}</div>;
};

export default Home;
