import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { UserDataProvider } from 'context/UserDataContext';

import App from './App';
import './assets/styles/main.css';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <UserDataProvider>
        <Router>
          <App />
        </Router>
      </UserDataProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
