import React from 'react';
import styled from 'styled-components';
import AuthTemplate from '../AuthTemplate/index';

const AuthFormWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
`;

const AuthForm = ({
  type = '',
  marginTop = '',
  form = {},
  handleChange,
  handleSubmit,
}) => {
  return (
    <AuthFormWrap>
      <AuthTemplate
        type={type}
        marginTop={marginTop}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      ></AuthTemplate>
    </AuthFormWrap>
  );
};

export default AuthForm;
