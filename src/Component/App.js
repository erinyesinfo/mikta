import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../Actions';

/* Pages */
import Explore from './App/Explore/Explore';
import CollectionsIdPhotos from './App/Pages/Collections-Id-Photos/CollectionsIdPhotos';
import SearchList from './App/Pages/Search/SearchList';
import Home from './App/Pages/Home/Home';
import Account from './App/Pages/Edit Account/Account';
import Username from './App/Pages/User/Username';
import Contact from './App/Pages/Contact us/Contact';
import NotFound from './App/Pages/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Explore} />
          
          <Route path='/s/photos/:title' exact render={routerProps => 
            <SearchList {...routerProps} />} />

          <Route path='/account' exact render={routerProps => 
            <Account {...routerProps} />} />
          
          <Route path='/collections/:id/:collectionTitle' exact render={routerProps =>
            <CollectionsIdPhotos {...routerProps} />} />

          { /* Home */ }
          <Route path='/home' exact render={routerProps => 
            <Home {...routerProps} />} />
          
          <Route path='/home/likes' exact render={routerProps =>
            <Home {...routerProps} />} />
          
          <Route path='/home/collections' exact render={routerProps =>
            <Home {...routerProps} />} />

          { /* username */ }
          <Route path='/@:username' exact render={routerProps => 
            <Username {...routerProps} />} />
          
          <Route path='/@:username/:more' exact render={routerProps => 
            <Username {...routerProps} />} />
          
          { /* Contact us */ }
          <Route path='/contact' exact render={routerProps => <Contact {...routerProps} />} />
          
          { /* 404 page */ }
          <Route render={routerProps => <NotFound {...routerProps} />} />
        </Switch>
      </BrowserRouter>
    );
  };
};

export default connect(null, actions)(App);
