import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/list';
import ReadViewer from '../../components/read/ReadViewer/index';

const ReadViewContainer = ({ match }) => {
  //처음 마운트될 때 포스트 읽기 API요청
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ list, loading }) => ({
    post: list.post,
    error: list.error,
    loading: loading['read/READ_POST'],
  }));

  useEffect(() => {
    dispatch(readPost(postId));
    //언마운트돨때 리덕스에서 언로드 실행
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  console.log({ post, match });
  return (
    <div>
      <ReadViewer post={post} error={error} loading={loading} />
    </div>
  );
};

export default withRouter(ReadViewContainer);
