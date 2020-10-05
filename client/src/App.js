import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import Home from './views/Home';
import Login from './views/Login';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [state, dispatch] = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: 'LOGIN',
    }).finally(() => setLoading(false));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      {loading ? (
        <LoadingScreen height="100vh" />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/read/:category">
              <Home />
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
