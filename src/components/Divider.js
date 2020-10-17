import styled from 'styled-components';

const Divider = styled.hr`
    padding: 0;
    margin: 0;
    color: ${props => (props.color ? props.color : 'white')};
`;

export default Divider;