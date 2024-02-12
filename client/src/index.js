import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Dashboard from './app/components/Dashboard';
import Profile from './app/components/Profile';
import NewProfile from './app/components/NewProfile';
import { ChakraProvider } from '@chakra-ui/react'
import { store } from './app/state/store';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/new-profile">
              <NewProfile />
            </Route>
            <Route path="/">
              <Redirect to={"/dashboard"}/>
            </Route>
          </Switch>
        </Router>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
