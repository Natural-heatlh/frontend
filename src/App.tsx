import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  ApolloLink
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import AuthCheck from './components/Auth/AuthCheck';
import Admin from './pages/Admin';
import { typeDefs } from './typeDefs';
import Courses from './pages/Courses';
import MyCourses from './pages/MyCourses';
import Auth from './pages/Auth';
import { store } from './index';
import { setIsAuth } from './slices/actions';
import './App.less';

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      console.log('error message');
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) => {
          if (extensions?.code === 'UNAUTHENTICATED') {
            store.dispatch(setIsAuth(false));

            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            );
          }
        });
      }

      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    link
  ]),
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
              <AuthCheck>
                <Admin />
              </AuthCheck>
            </Route>
            <Route path="/courses">
              <AuthCheck>
                <Courses />
              </AuthCheck>
            </Route>
            <Route path="/my-courses">
              <AuthCheck>
                <MyCourses />
              </AuthCheck>
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
