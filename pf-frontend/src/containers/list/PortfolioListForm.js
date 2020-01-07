import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PortfolioList from '../../components/list/PortfolioList';
import { portfolioList } from '../../modules/list';
import { Action } from '../../../../../../../Library/Caches/typescript/3.7/node_modules/rxjs/internal/scheduler/Action';

function PortfolioListForm() {
  const dispatch = useDispatch();
  const { allPost, allPostError } = useSelector(({ list }) => ({
    allPost: list.allPost,
    allPostError: list.allPostError,
  }));

  useEffect(() => {
    dispatch(portfolioList(allPost));
  }, [dispatch]);

  useEffect(() => {
    if (allPost) {
      console.log('리스트 성공');
      console.log({ allPost });
    }
    if (allPostError) {
      console.log('리스트 실패');
      console.log(allPostError);
      return;
    }
  }, [allPost, allPostError]);

  return <PortfolioList listData={allPost} />;
}

export default PortfolioListForm;
