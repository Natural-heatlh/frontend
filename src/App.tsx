import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import Admin from './pages/Admin';
import { typeDefs } from './typeDefs';

const client = new ApolloClient({
  uri: 'https://polar-plateau-93142.herokuapp.com/graphql',
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
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </div>
  );
}

export default App;
