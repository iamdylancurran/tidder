import React, { useContext, useEffect, useState } from 'react';
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
  }, []);

  return (
    <div className="App">
      {loading ? (
        <LoadingScreen />
      ) : (
        <>{state.authenticated ? <Home /> : <Login />}</>
      )}
    </div>
  );
}

export default App;
