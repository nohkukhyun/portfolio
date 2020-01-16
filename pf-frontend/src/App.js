import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ListPage from './pages/ListPage';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import ModalPage from './pages/ModalPage';
import styled from 'styled-components';
import HeaderContainer from './containers/common/HeaderContainer';

const AppWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

const AppBodyWrap = styled.div`
  width: 80%;
  background-color: #e6e7e5;
  position: absolute;
  right: 0;
`;
function App() {
  return (
    <AppWrap className="App">
      <HeaderContainer />
      <AppBodyWrap>
        <Route component={ListPage} path={'/'} exact />
        <Route component={LoginPage} path={'/login'} />
        <Route component={PostPage} path={'/:postId'} />
        <Route component={WritePage} path={'/write'} />
        <Route component={RegisterPage} path={'/register'} />
        {/* <Route component={ModalPage} path={`/test`} /> */}
      </AppBodyWrap>
    </AppWrap>
  );
}

export default App;
