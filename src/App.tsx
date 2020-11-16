import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.less';
import Admin from './pages/Admin';
import { typeDefs } from './typeDefs';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import Auth from './pages/Auth';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
  typeDefs
});

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route path="/admin">
              <Admin />
            </Route>
            <Route path="/courses">
              <Courses />
            </Route>
            <Route path="/my-courses">
              <MyCourses />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
