import React from 'react';
import styled from 'styled-components';
import AuthTemplate from '../AuthTemplate/index';
import Button from '../../common/Button/index';

const AuthFormWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
`;

const AuthTemplateWrap = styled.div`
  width: 500px;
  height: 500px;
  -webkit-box-shadow: 6px 10px 6px -1px rgba(224, 224, 224, 1);
  -moz-box-shadow: 6px 10px 6px -1px rgba(224, 224, 224, 1);
  box-shadow: 6px 10px 6px -1px rgba(224, 224, 224, 1);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  .logo {
    font-weight: bold;
    font-style: italic;
    color: #0028ff;
  }
  .typeTitle {
    color: #0028ff;
  }
  form {
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const InputForm = styled.input`
  padding: 10px;
  font-size: 1.5rem;
  border-radius: 5px;
  border: 1px solid #0028ff;
  width: 60%;
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Footer = styled.footer`
  width: 100%;
  border-top: 1px solid #0028ff;
  position: fixed;
  bottom: 0;
  padding: 10px;
  color: #0028ff;
  font-size: 13px;
`;

const ErrorMsg = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
`;

const AuthForm = ({
  type = '',
  marginTop = '',
  form = {},
  handleChange,
  handleSubmit,
  error = '',
  idError = '',
  passwordError = '',
}) => {
  return (
    <AuthFormWrap>
      <AuthTemplateWrap>
        <h1 className="logo">DanOh!!</h1>
        <h3 className="typeTitle">
          {type === 'register' ? 'Sign Up' : 'Login'}
        </h3>
        <form style={{ marginTop: marginTop }} onSubmit={handleSubmit}>
          <InputForm
            type="text"
            placeholder="id"
            autoComplete="username"
            name="username"
            onChange={handleChange}
            value={form.username}
          />
          <InputForm
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={form.password}
          />
          {type === 'register' && (
            <InputForm
              type="password"
              name="passwordConfirm"
              placeholder="password"
              onChange={handleChange}
              value={form.passwordConfirm}
            />
          )}
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {idError && <ErrorMsg>{idError}</ErrorMsg>}
          {passwordError && <ErrorMsg>{passwordError}</ErrorMsg>}
          <Button
            style={{
              width: '60%',
              backgroundColor: '#0028ff',
              padding: '1rem 0',
            }}
          >
            {type === 'register' ? 'Sign Up' : 'Login'}
          </Button>
        </form>
        <Footer>{type === 'register' ? 'Login' : 'Sign Up'}</Footer>
      </AuthTemplateWrap>
    </AuthFormWrap>
  );
};

export default AuthForm;
