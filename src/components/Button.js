import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : 'white')};
  color: white;
  border: ${props => (props.border ? props.border : '2px solid white;')};
  padding: 1rem;
  margin: 0;
  font-size: inherit;
  align-self: center;
  width: 100%;
  :hover {
    border-color: #ffd43f;
  }
  :disabled {
	border-color: #0Affd43f;
  }
`;

export default Button;
