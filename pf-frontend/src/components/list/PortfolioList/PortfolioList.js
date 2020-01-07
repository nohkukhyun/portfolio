import React from 'react';
import styled from 'styled-components';

const PfListWrapBody = styled.div`
  width: 100%;
  position: relative;
  display: block;
`;

function PortfolioList({ listData = [] }) {
  return (
    <PfListWrapBody>
      {listData &&
        listData.map((data, i) => {
          return (
            <div>
              {data.title}
              <img src={data.image}></img>
            </div>
          );
        })}
    </PfListWrapBody>
  );
}

export default PortfolioList;
