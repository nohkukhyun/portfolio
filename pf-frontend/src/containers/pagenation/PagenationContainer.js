import React from 'react';
import Pagenation from '../../components/list/PortfolioList/Pagenation';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

const PagenationContainer = ({ location }) => {
  const { lastPage, allPost, loading } = useSelector(({ list, loading }) => ({
    lastPage: posts,
    lastPage,
    allPost: list.allPost,
    loading: loading['list/LIST_FETCH'],
  }));
  return (
    <div>
      <Pagenation />
    </div>
  );
};

export default PagenationContainer;
