import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PortfolioWriteForm from '../../components/write/PortfolioWriteForm';
import { changeField } from '../../modules/write';

function WriteForm() {
  const dispatch = useDispatch();
  const { form } = useSelector(({ portfolio }) => {
    form: portfolio.write;
  });

  const handleChange = e => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: 'write',
        name: name,
        value,
      }),
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { title, skils, description } = form;
    return;
    //예정
  };

  return (
    <PortfolioWriteForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      form={form}
    />
  );
}

export default WriteForm;
