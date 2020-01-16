import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalWrap = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999999;
`;

const ModalContainer = ({ children }) => {
  const [hide, setHide] = useState(false);

  const handleModal = () => {
    setHide(true);
  };

  return !hide ? <ModalWrap onClick={handleModal}>{children}</ModalWrap> : '';
};

export default ModalContainer;
