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

  return (
    <div style={{ width: '20%' }}>
      <Navigation user={user} onLogout={onLogout} />
    </div>
  );
};

export default HeaderContainer;
