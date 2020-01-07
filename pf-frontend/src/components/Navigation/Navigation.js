import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavigationWrap = styled.div`
  width: 20%;
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100vh;
  position: relaltive;
  background-color: #fff;
  .logo {
    font-size: 3rem;
    font-weight: bold;
    color: #033fff;
    margin: 0;
  }
`;

const NavagationList = styled.ul`
  list-style: none;
  padding: 0;
  li {
    position: relative;
    padding: 20px 0;
    width: 0px;
    a {
      position: relative;
      z-index: 2;
      font-weight: bold;
      text-align: left;
      color: #233142;
      padding: 0 5px;
    }
    &.active {
      .line {
        width: 40px;
        height: 1px;
        background-color: blue;
        position: absolute;
        left: 15px;
        bottom: 29px;
        transform: scale(1);
        transition: transform 0.5s ease;
        &.active {
          transform: scale(2);
        }
      }
    }
  }
`;

const LoginSection = styled.div`
  margin-left: auto;
  position: absolute;
  left: 15px;
  bottom: 25px;
  font-size: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  a {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const naviData = [
  {
    title: 'WORK',
    path: '/',
  },
  {
    title: 'WRITE',
    path: '/write',
  },
  {
    title: 'ABOUT',
    path: '/about',
  },
];

const Navigation = ({ user, onLogout }) => {
  const [idx, setIdx] = useState(0);
  const handleActive = i => {
    setIdx(i);
  };

  return (
    <NavigationWrap>
      <h1 className="logo">
        <Link to="/">N</Link>
      </h1>
      <NavagationList>
        {naviData.map((data, i) => (
          <li
            onClick={() => handleActive(i)}
            className={i === idx ? 'active' : ''}
            key={`navi-${i}`}
          >
            <Link to={data.path}>{data.title}</Link>
            <div className={`line ${i === idx ? 'active' : ''}`}></div>
          </li>
        ))}
      </NavagationList>
      <LoginSection>
        {user ? user.username : <Link to="/login">Sign In</Link>}
        {user ? (
          <p onClick={onLogout}>logout</p>
        ) : (
          <Link to="/register">Sign Up</Link>
        )}
      </LoginSection>
    </NavigationWrap>
  );
};

export default Navigation;
