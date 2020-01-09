import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PortfolioList from '../../components/list/PortfolioList';
import { portfolioList } from '../../modules/list';

function PortfolioListForm({ history }) {
  const dispatch = useDispatch();
  const { allPost, allPostError } = useSelector(({ list }) => ({
    allPost: list.allPost,
    allPostError: list.allPostError,
  }));

  useEffect(() => {
    // console.log({ history });
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

  return <PortfolioList listData={allPost} history={history} />;
}

export default withRouter(PortfolioListForm);
