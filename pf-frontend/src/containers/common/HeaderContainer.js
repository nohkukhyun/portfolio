import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/Navigation';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  const style = {
    width: '20%',
    position: 'fixed',
    left: '0',
    top: '0',
    height: '100vh',
    backgroundColor: '#fff',
    zIndex: '1',
  };

  return (
    <div style={style}>
      <Navigation user={user} onLogout={onLogout} />
    </div>
  );
};

export default HeaderContainer;
