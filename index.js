import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PostsIndex from './components/PostsIndex';
import VisTime from './components/Vis';
import PostsNew from './components/PostsNew';
import PostsShow from './components/PostsShow';

import configureStore from './store';
import './style/style.css'
import './style/black-dashboard-react.css'
const store = configureStore();

// The <Switch> component will only show the first route contained within it that matches a pattern
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    
      <div className="page-body">
      <nav className="navbar-absolute navbar-transparent navbar navbar-expand-lg">
   <div className="container-fluid">
      <div className="navbar-wrapper">
         <div className="navbar-toggle d-inline toggled"><button className="navbar-toggler" type="button"><span className="navbar-toggler-bar bar1"></span><span className="navbar-toggler-bar bar2"></span><span className="navbar-toggler-bar bar3"></span></button></div>
         <a href="#pablo" className="navbar-brand">User Profile</a>
      </div>
      
   </div>
</nav>
        <Switch>
          <Route path="/posts/new/" component={PostsNew} />
          <Route path="/posts/:id" component={PostsShow} />
          <Route path="/vis" component={PostsIndex} />
          <Route path="/" component={VisTime} />
          
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#container')
);
