import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignIn from './app/components/pages/auth/SignIn';
import CreateAccount from './app/components/pages/auth/CreateAccount';
import Dashboard from './app/components/pages/Dashboard';
import Profile from './app/components/pages/Profile';
import NewProfile from './app/components/pages/NewProfile';
import { ChakraProvider } from '@chakra-ui/react'
import { store } from './app/state/store';
import { Provider } from 'react-redux';
import { Urls } from './shared/urls';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Theme from './shared/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={Theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path={Urls.DASHBOARD_ROUTE_URL}>
              <Dashboard />
            </Route>
            <Route path={Urls.PROFILE_ROUTE_URL}>
              <Profile />
            </Route>
            <Route path={Urls.NEW_PATIENT_PROFILE_ROUTE_URL}>
              <NewProfile />
            </Route>
            <Route path={Urls.SIGN_IN_ROUTE_URL}>
              <SignIn/>
            </Route>
            <Route path={Urls.CREATE_ACCOUNT_ROUTE_URL}>
              <CreateAccount/>
            </Route>
            <Route path="/">
              <Redirect to={Urls.SIGN_IN_ROUTE_URL}/>
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
