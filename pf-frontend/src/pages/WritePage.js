import React from 'react';
import styled from 'styled-components';

const PfListWrap = styled.div`
  width: 900px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 500px;
`;

function WritePage() {
  return <PfListWrap>dd</PfListWrap>;
}

export default WritePage;
