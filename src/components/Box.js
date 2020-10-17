import styled from 'styled-components';
import boxMediaQueries from '../utils/boxMediaQueries';

const Box = styled.div`
  background: ${props => (props.backgroundColor ? props.backgroundColor : 'gray')};
  ${boxMediaQueries({})}
`;

export default Box;
