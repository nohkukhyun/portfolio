import React from 'react';
import styled from 'styled-components';

const ModalWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  min-height: 300px;
  min-width: 300px;
  padding: 30px;
  background-color: #fff;
  -webkit-box-shadow: 5px 5px 9px 1px rgba(201, 201, 201, 1);
  box-shadow: 5px 5px 5px 1px rgba(201, 201, 201, 1);
`;

const Modal = () => {
  return <ModalWrap></ModalWrap>;
};

export default Modal;
