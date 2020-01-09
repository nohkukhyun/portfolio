import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button/index';

const ReadViewerWrap = styled.div`
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Title = styled.h3`
  font-size: 3rem;
  font-weight: bold;
  text-align: left;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 25rem;
  border: 1px solid #1089ff;
  position: relative;
  label {
    cursor: pointer;
    width: 100%;
    height: 25rem;
    border: 1px solid #ececec;
    display: block;
    position: relative;
    margin-right: 10px;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: #1089ff;
  }
`;
const ImageForm = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
  /* display: none; */
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 30px;
  .content_title {
    font-size: 1.4rem;
    color: #333;
    display: inline-block;
    text-align: left;
    margin-top: 2.5rem;
    margin-bottom: 0;
  }
  .content_description {
    font-size: 1.2rem;
    color: #333;
    display: inline-block;
    text-align: left;
  }
  p {
    font-size: 1.2rem;
    display: inline-block;
    text-align: left;
  }
`;

const ErrorMsg = styled.div`
  width: 100%;
  color: red;
  font-size: 1.5rem;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ReadViewer = ({ post, error, loading, handleChange, handleSubmit }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <ErrorMsg>존재하지 않는 포스트 입니다.</ErrorMsg>;
    }
    if (error.response && error.response.status === 500) {
      return <ErrorMsg>500 에러 입니다.</ErrorMsg>;
    }
  }

  if (loading || !post) {
    return null;
  }
  const { title, description, skils, part, image } = post;

  // console.log({ post, error, loading });
  return (
    <ReadViewerWrap>
      <Title>{title}</Title>
      <ImageBox>
        <label for="selimg"></label>
        <ImageForm type="file" id="selimg" onChange={handleChange} />
        {image ? (
          <img src="" alt="image" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
          </svg>
        )}
      </ImageBox>
      {image && (
        <Button style={{ marginTop: '50px' }} onClick={handleSubmit}>
          upload
        </Button>
      )}
      <ContentBox>
        <p className="content_description">{description}</p>
        <h3 className="content_title">사용한 기술</h3>
        <p>{skils}</p>
        <h3 className="content_title">참여율</h3>
        <p>{part}</p>
      </ContentBox>
    </ReadViewerWrap>
  );
};

export default ReadViewer;
