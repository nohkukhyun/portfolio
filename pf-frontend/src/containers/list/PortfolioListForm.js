import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PortfolioList from '../../components/list/PortfolioList';
// import { portfolioList } from '../../modules/list';

function PortfolioListForm() {
  // const dispatch = useDispatch();
  // const { post, listDataError } = useSelector(({ list }) => ({
  //   post: list.post,
  //   listDataError: list.listDataError,
  // }));

  // useEffect(() => {
  //   console.log({ post });
  //   dispatch(portfolioList(post));
  // }, [dispatch]);

  // useEffect(() => {
  //   if (post) {
  //     console.log('리스트 성공');
  //     console.log({ post });
  //   }
  //   if (listDataError) {
  //     console.log('리스트 실패');
  //     console.log(listDataError);
  //     return;
  //   }
  // }, [post, listDataError]);

  return <PortfolioList />;
}

export default PortfolioListForm;
