import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/read';
import ReadViewer from '../../components/read/ReadViewer';
import { fileUpload } from '../../modules/upload';
import axios from 'axios';

const ReadViewContainer = ({ match }) => {
  //처음 마운트될 때 포스트 읽기 API요청
  const [files, setFiles] = useState(null);
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading } = useSelector(({ read, loading }) => ({
    post: read.post,
    error: read.error,
    loading: loading['read/READ_POST'],
  }));

  const handleChange = e => {
    let img = e.target.files[0];
    setFiles(img);
    console.log(files);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const frmData = new FormData();
    frmData.append('file', files);
    frmData.append('file', files.name);
    console.log('ReadViewContainer', { files });
    dispatch(fileUpload(files));
  };

  useEffect(() => {
    dispatch(readPost(postId));
    setFiles(files);
    //언마운트돨때 리덕스에서 언로드 실행
    return () => {
      dispatch(unloadPost());
      setFiles(files);
    };
  }, [dispatch, postId, setFiles]);

  // console.log({ post, match, error, loading });
  return (
    <div>
      <ReadViewer
        post={post}
        error={error}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        files={files}
      />
    </div>
  );
};

export default withRouter(ReadViewContainer);
