import styled from 'styled-components';
import gridMediaQueries from '../utils/gridMediaQueries';

const Wrapper = styled.div`
  display: grid;
  ${gridMediaQueries({})};
  grid-gap: 5px;
  align-self: center;
`;

export default Wrapper;
