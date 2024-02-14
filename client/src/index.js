import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignIn from './app/components/pages/SignIn';
import CreateAccount from './app/components/pages/CreateAccount';
import Dashboard from './app/components/pages/Dashboard';
import Profile from './app/components/pages/Profile';
import NewProfile from './app/components/pages/NewProfile';
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
            <Route path="/sign-in">
              <SignIn/>
            </Route>
            <Route path="/create-account">
              <CreateAccount/>
            </Route>
            <Route path="/">
              <Redirect to={"/sign-in"}/>
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
