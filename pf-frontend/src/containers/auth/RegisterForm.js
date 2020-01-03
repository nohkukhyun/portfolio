import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter } from 'react-router-dom';

const RegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  //인풋 값 변경 핸들러
  const handleChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  //submit
  const handleSubmit = e => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if (username === '' || username.length < 3) {
      setError('아이디는 4자 이상입니다.');
      return;
    }
    if (password.length < 4 || password === '') {
      setError('비밀번호는 4자 이상입니다.');
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    dispatch(register({ username, password }));
  };

  //처음 컴포넌트 렌더링시 form을 초기화
  useEffect(() => {
    console.log({ form });
    dispatch(initializeForm('register'));
  }, [dispatch]);

  //회원가입 성공/실패처리
  useEffect(() => {
    if (auth) {
      console.log('회원가입 성공!');
      console.log({ auth });
      dispatch(check());
    }
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      return;
    }
  }, [auth, authError, dispatch]);

  //회원가입후 로그인 후 홈으로 이동
  useEffect(() => {
    if (user) {
      console.log('user', user);
      console.log('check api success');
      history.push('/');
    }
  }, [history, user]);

  return (
    <AuthForm
      type={'register'}
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      marginTop={'35px'}
      error={error}
    />
  );
};

export default withRouter(RegisterForm);
