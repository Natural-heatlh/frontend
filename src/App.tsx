import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Protected from './pages/ProtectedRoutes';
import Auth from './pages/Auth';
import './App.less';
import Landing from './pages/Landing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path={['/admin', '/courses', '/my-courses', '/course', '/profile']}>
            <Protected />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
