import React, { useEffect } from 'react';
import styled from 'styled-components';

const PfListWrap = styled.div`
  width: 100%;
  position: relative;
`;

const PfListWrapBody = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PfImage = styled.div`
  width: 50%;
  height: 500px;
  border-left: 1px solid #acacac;
  border-right: 1px solid #acacac;
  border-bottom: 1px solid #acacac;
  &:nth-child(odd) {
    border-right: 0px;
    border-top: 0px;
  }

  @media (max-width: 1024px) {
    width: 100%;
    height: 500px;
    border-bottom: 1px solid #acacac;
  }
`;

function PortfolioList({ listData = [], history }) {
  const handleClick = id => {
    history.push(`/${id}`);
  };

  // console.log(this.props);
  return (
    <PfListWrap>
      <PfListWrapBody>
        {listData &&
          listData.map((data, i) => {
            return (
              <PfImage onClick={() => handleClick(data._id)}>
                {data.title}
                {data.image && <img src={data.image} alt="thumbnail" />}
              </PfImage>
            );
          })}
      </PfListWrapBody>
    </PfListWrap>
  );
}

export default PortfolioList;
