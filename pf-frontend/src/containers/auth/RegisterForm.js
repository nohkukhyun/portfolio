import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
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
    if (password !== passwordConfirm) {
      return;
    }
    dispatch(register({ username, password }));
  };

  //처음 컴포넌트 렌더링시 form을 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // useEffect(() => {
  //   if (authError) {
  //     console.log('error!!'), console.log(authError);
  //     return;
  //   }
  //   if (auth) {
  //     console.log('가입 성공');
  //     console.log(auth);
  //   }
  // }, [auth, authError]);

  return (
    <AuthForm
      type={'register'}
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      marginTop={'35px'}
    />
  );
};

export default RegisterForm;
