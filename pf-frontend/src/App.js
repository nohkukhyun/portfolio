import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ListPage from './pages/ListPage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';

function App() {
  return (
    <div className="App">
      <Route component={ListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path={'/login'} />
      <Route component={PostPage} path={'/@:username/:postId'} />
      <Route component={WritePage} path={'/write'} />
      <Route component={RegisterPage} path={'/register'} />
    </div>
  );
}

export default App;
