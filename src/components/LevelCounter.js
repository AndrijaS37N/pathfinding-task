import styled from 'styled-components';

const LevelCounter = styled.div`
  color: teal;	
  align-self: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  display: flex;
  :before {
	  content: "L"
  }
`;

export default LevelCounter;
