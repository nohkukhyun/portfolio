import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({
    form: auth.register,
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
  };

  //처음 컴포넌트 렌더링시 form을 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

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
