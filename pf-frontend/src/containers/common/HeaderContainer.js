import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from '../../components/Navigation';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
  const { user, modal } = useSelector(({ user, modal }) => ({
    user: user.user,
    modal: modal,
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

  const handleModal = () => {};

  // console.log('HeaderContainer', { modal });

  return (
    <div style={style}>
      <Navigation
        user={user}
        modal={modal}
        onLogout={onLogout}
        handleModal={handleModal}
      />
    </div>
  );
};

export default HeaderContainer;
