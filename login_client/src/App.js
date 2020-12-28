import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/PrivateRoute';
import { isUserLoggedIn } from './actions';
import { useDispatch, useSelector } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/home" exact component={Home} />
      </Switch>
    </div>
  );
}

export default App;

