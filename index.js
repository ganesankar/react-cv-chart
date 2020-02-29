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
const store = configureStore();

// The <Switch> component will only show the first route contained within it that matches a pattern
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    
      <div><div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
  <h5 className="my-0 mr-md-auto font-weight-normal"> Ganesan Karuppaiya</h5>
  <nav className="my-2 my-md-0 mr-md-3">
  </nav>
  <a className="btn btn-outline-primary" href="#"></a>
</div>
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
