import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button/index';

const PortfolioWriteWrap = styled.div`
  width: 100%;
  padding: 20px;
  -webkit-box-shadow: 5px 5px 15px 5px #dddddd;
  box-shadow: 5px 5px 15px 5px #dddddd;
  height: 100%;

  .pfTitleSection {
    display: flex;
    position: relative;
    flex-direction: row;
    margin: 20px 0;
  }
`;

const InputForm = styled.input`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ececec;
  padding: 10px;
  font-size: 12px;
  margin-right: 10px;
  &:last-child {
    margin-right: 0px;
  }
  &::after {
    content: '';
    width: 100px;
    height: 20px;
  }
`;

const ImageFormWrap = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: 100%;
  display: flex;
  label {
    cursor: pointer;
    width: 70px;
    height: 70px;
    border: 1px solid #ececec;
    display: block;
    position: relative;
    margin-right: 10px;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .imageWrap {
    width: 70px;
    height: 70px;
    img {
      width: 100%;
    }
  }
`;

const ImageForm = styled.input`
  opacity: 0;
  position: absolute;
  z-index: -1;
  /* display: none; */
`;

const TextForm = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 10px;
  resize: none;
  border-radius: 5px;
  border: 1px solid #ececec;
  margin-bottom: 20px;
`;

const ErrorMsg = styled.div`
  width: 100%;
  position: relative;
  color: red;
  text-align: center;
  font-size: 12px;
`;

function PortfolioWriteForm({
  portfolio = {},
  handleChange,
  handleSubmit,
  error = '',
  img, //image preview,
}) {
  return (
    <PortfolioWriteWrap>
      <h3>Write</h3>
      <form onSubmit={handleSubmit}>
        <InputForm
          name="title"
          type="text"
          value={portfolio.title}
          onChange={handleChange}
          placeholder="project name..."
        />
        <div className="pfTitleSection">
          <InputForm
            name="skils"
            type="text"
            value={portfolio.skils}
            onChange={handleChange}
            placeholder="skils..."
          />
          <InputForm
            name="part"
            type="text"
            value={portfolio.part}
            onChange={handleChange}
            placeholder="part..."
          />
        </div>
        <TextForm
          name="description"
          value={portfolio.description}
          onChange={handleChange}
          placeholder="description..."
        />
        <ImageFormWrap>
          <label for="image-upload">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="gray"
            >
              <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
            </svg>
          </label>
          <div className="imageWrap">
            <img src={img} />
          </div>
          <ImageForm
            name="image"
            type="file"
            value={portfolio.image}
            onChange={handleChange}
            placeholder="image..."
            id="image-upload"
          />
        </ImageFormWrap>
        <div style={{ height: '20px', marginTop: '20px' }}>
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </div>
        <Button
          style={{
            backgroundColor: 'gray',
            color: '#fefefe',
            marginTop: '20px',
          }}
        >
          글 쓰기
        </Button>
      </form>
    </PortfolioWriteWrap>
  );
}

export default PortfolioWriteForm;
