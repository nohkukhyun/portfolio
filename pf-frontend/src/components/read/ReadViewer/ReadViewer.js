import React from 'react';
import styled from 'styled-components';

const ReadViewerWrap = styled.div`
  width: 100%;
  position: relative;
`;

const Title = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  text-align: left;
`;

const ErrorMsg = styled.div`
  width: 100%;
  color: red;
  font-size: 3rem;
  text-align: center;
`;

const ReadViewer = ({ post, error, loading }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <ErrorMsg>존재하지 않는 포스트 입니다.</ErrorMsg>;
    }
  }

  if (loading || !post) {
    return null;
  }

  const { title, description, skils, part, image } = post;
  console.log({ post });
  return (
    <ReadViewerWrap>
      <Title>{title}</Title>
      <img src={image} alt="name" />
      <p>{description}</p>
      <p>{skils}</p>
      <p>{part}</p>
    </ReadViewerWrap>
  );
};

export default ReadViewer;
