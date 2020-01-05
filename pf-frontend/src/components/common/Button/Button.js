import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: #fff;
  outline: none;
  cursor: pointer;
  background-color: #1089ff;
  &:hover {
    background-color: #1089ff;
  }
`;

const Button = ({ props, history, to, ...rest }) => {
  const onClick = e => {
    if (to) {
      history.push(to);
    }
    if (rest.onClick) {
      rest.onClick(e);
    }
  };
  return <StyledButton {...rest} onClick={onClick} />;
};

export default Button;
