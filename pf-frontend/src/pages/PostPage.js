import React from 'react';
import ReadViewContainer from '../containers/read/ReadViewContainer';
import ReadViewer from '../components/read/ReadViewer/index';

const PostPage = () => {
  return (
    <div>
      <ReadViewer />
      <ReadViewContainer />
    </div>
  );
};

export default PostPage;
