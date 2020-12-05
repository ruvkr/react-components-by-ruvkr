import styled from 'styled-components';
import { darken } from 'polished';

import sample_pic from './sample_pic.jpg';

export const Profile: React.FC = () => {
  return (
    <ScContainer>
      <ScProfilePic $pic={sample_pic} />
      <ScUserDetails>
        <ScUserName>Welcome ruvkr...</ScUserName>
        <ScUserID>ID568896</ScUserID>
      </ScUserDetails>
    </ScContainer>
  );
};

const ScContainer = styled.div`
  width: 100%;
  height: 80vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${p => darken(0.01, p.theme.col5)};

  @media (min-width: 480px) {
    height: 320px;
  }
`;

const ScProfilePic = styled.div<{ $pic: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: black;
  background-image: ${p => 'url(' + p.$pic + ')'};
  background-size: cover;
  z-index: 1;
`;

const ScUserDetails = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScUserName = styled.div`
  color: ${p => p.theme.col1};
  font-size: 1.5em;
  font-weight: 300;
`;

const ScUserID = styled.div`
  color: ${p => p.theme.col2};
  margin-top: 4px;
`;
