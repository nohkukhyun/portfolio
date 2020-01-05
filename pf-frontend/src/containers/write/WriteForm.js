import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PortfolioWriteForm from '../../components/write/PortfolioWriteForm';
import {
  changeField,
  initializeForm,
  portfolioWrite,
} from '../../modules/write';

function WriteForm({ history }) {
  const [error, setError] = useState(null);
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const { portfolio, portfolioError, portfolioFull } = useSelector(
    ({ write }) => ({
      portfolio: write.portfolio,
      portfolioFull: write.portfolioFull,
      portfolioError: write.portfolioError,
    }),
  );

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'image') {
      setImg(URL.createObjectURL(e.target.files[0]));
    }
    console.log(name, value);
    dispatch(
      changeField({
        portfolio: portfolio,
        name: name,
        value,
      }),
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    const {
      title = '',
      skils = '',
      description = '',
      image = '',
      part = '',
    } = portfolio;
    if (title === '' || title.length < 2) {
      setError('제목은 3자 이상 적어주세요');
      return;
    }
    if (skils === '' || skils < 0) {
      setError('사용한 스킬은 하나이상 적어주세요');
      return;
    }
    if (description === '' || description.length < 1) {
      setError('프로젝트 설명은 20자 이상 적어주세요');
      return;
    }
    dispatch(portfolioWrite({ title, skils, description, image, part }));
  };

  useEffect(() => {
    dispatch(initializeForm(portfolio));
  }, [dispatch]);

  useEffect(() => {
    if (portfolioError) {
      console.log('글쓰기 실패');
      console.log(portfolioError);
      return;
    }
    if (portfolioFull) {
      console.log('글쓰기 성공');
      console.log(portfolioFull);
      const { _id, user } = portfolioFull;
      history.push(`/@${user.username}/${_id}`);
    }
  }, [portfolioFull, portfolioError]);

  return (
    <PortfolioWriteForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      portfolio={portfolio}
      img={img}
    />
  );
}

export default withRouter(WriteForm);
