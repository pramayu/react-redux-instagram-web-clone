import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import isNotLoggin from '../shared/authenticate';
import App from '../components/app';
import SignupPage from '../components/signup/signup-page';
import SigninPage from '../components/signin/signin-page';
import SignupSuccess from '../components/signup/signup-success';
import Verify from '../components/signin/verify';
import AccountPage from '../components/accounts/account-page';
import ProfilePage from '../components/accounts/profile-page';
import PassPage from '../components/accounts/password-page';
import PassReset from '../components/accounts/reset-page';
import ResetForm from '../components/accounts/reset-form';
import RenewForm from '../components/accounts/renew-form';
import UserPage from '../components/main/user-page';


export default (
  <Route path='/'>
    <IndexRoute component={ isNotLoggin(App) } />
    <Route path='accounts' component={ isNotLoggin(AccountPage) }>
      <Route path='edit' component={ isNotLoggin(ProfilePage) } />
      <Route path='password/change' component={ isNotLoggin(PassPage) } />
    </Route>
    <Route path='accounts/password' component={PassReset}>
      <Route path='reset' component={ResetForm} />
      <Route path='31f70419689b279f66596c6b48/:token' component={RenewForm} />
    </Route>
    <Route path='user/:user_pg' component={UserPage} />
    <Route path='signup' component={ SignupPage } />
    <Route path='signin' component={ SigninPage } />
    <Route path='signup/success' component={ SignupSuccess } />
    <Route path='verify/:token' component={ Verify } />
  </Route>
)
