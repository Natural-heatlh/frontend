import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  courseReducer,
  coursesReducer,
  authReducer,
  testReducer
} from './slices/reducers';
import { setIsAuth } from './slices/auth';
import { typeDefs } from './typeDefs';

const rootReducer = combineReducers({
  courses: coursesReducer,
  course: courseReducer,
  auth: authReducer,
  test: testReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true
});

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError, response }) => {

      console.log(graphQLErrors, networkError);
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

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </ApolloProvider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
