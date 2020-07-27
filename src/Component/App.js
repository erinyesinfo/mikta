import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import Server from '../API/Server';
import Mikta from './Mikta';
import './App.css';

// Header
import Header from './App/Header';

/* Pages */
import Explore from './App/Explore';
import CollectionsPhotos from './App/Pages/Collections-Photos';
import SearchList from './App/Pages/Search';
import Home from './App/Pages/Home';
import Account from './App/Pages/Edit Account';
import Username from './App/Pages/User';
import License from './App/Pages/License';
import Contact from './App/Pages/Contact us';
import NotFound from './App/Pages/NotFound';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { spinner: true };
  };
  handleCloseSpinner = () => this.setState({ spinner: false });
  async componentDidMount() {
    const api = await Server.get("/user-login");
    if (api.data === "success") {
      this.props.handleDBloginStatus(true);
      const apiData = await Server.post("/user-data", { id: '214082ee-34f0-4316-8881-a474d8c82d7b' });
      if (apiData.data !== "failure") {
        this.handleCloseSpinner();
        this.props.handleDidMountUserData(apiData.data.user, apiData.data.profileImage);// profile user
        this.props.handleDidMountSharedData(apiData.data.shared);// shared data
        this.props.handleDidMountLikesData(apiData.data.likes);// likes data
        this.props.handleDidMountCollectionsData(apiData.data.collection);// collection data
        this.props.handleDidMountFollowingData(apiData.data.following);// following data
      }
    } else {
      this.handleCloseSpinner();
      if (!localStorage.getItem("f11cce98b5b5")) {
        if (Object.keys(localStorage).length !== 0) {
          localStorage.clear();
        }
      }
      const cookies = new Cookies();
      if (cookies.get("214082ee-34f0-4316-8881-a474d8c82d7b")) {
        cookies.remove("214082ee-34f0-4316-8881-a474d8c82d7b");
      }
    };
  };
  render() {
    if (this.state.spinner) return <div className="app-spinner"><Mikta /></div>;
    return (
      <BrowserRouter>
        <Route render={routerProps => 
          <Header {...routerProps} />} />
        <Switch>
          <Route path='/' exact component={Explore} />
          
          <Route path='/s/photos/:title' exact render={routerProps => 
            <SearchList {...routerProps} />} />

          <Route path={['/account', '/account/password', '/account/close']} exact render={routerProps => 
            <Account {...routerProps} />} />
          
          <Route path={[ '/collections/:id', '/collections/:id/:title', '/collections/:id/:title/:ib' ]} exact render={routerProps =>
            <CollectionsPhotos {...routerProps} />} />
          
          { /* Home */ }
          <Route path={['/home', '/home/likes', '/home/collections']} exact render={routerProps =>
            <Home {...routerProps} />} />

          { /* username */ }
          <Route path={['/@:username', '/@:username/:more']} exact render={routerProps => 
            <Username {...routerProps} />} />
          
          { /* License */ }
          <Route path='/license' exact render={routerProps => <License {...routerProps} />} />
          
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
