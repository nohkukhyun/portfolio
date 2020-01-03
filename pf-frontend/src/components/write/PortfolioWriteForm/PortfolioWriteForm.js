import React from 'react';
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
`;

const TextForm = styled.textarea`
  width: 100%;
  min-height: 300px;
  padding: 10px;
  resize: none;
  border-radius: 5px;
  margin-top: 10px;
  border: 1px solid #ececec;
`;

function PortfolioWriteForm({ form = {}, handlechange, handleSubmit }) {
  return (
    <PortfolioWriteWrap>
      <h3>Write</h3>
      <form onSubmit>
        <div className="pfTitleSection">
          <InputForm
            name="name"
            type="text"
            value={form.title}
            placeholder="Project Name"
            onChange={handlechange}
          />
          <InputForm
            name="skils"
            type="text"
            value={form.skils}
            placeholder="skils"
            onChange={handlechange}
          />
        </div>
        <TextForm
          name="description"
          value={form.description}
          placeholder="description..."
        ></TextForm>
        <Button
          style={{
            backgroundColor: 'gray',
            color: '#fefefe',
            marginTop: '10px',
          }}
        >
          글 쓰기
        </Button>
      </form>
    </PortfolioWriteWrap>
  );
}

export default PortfolioWriteForm;
