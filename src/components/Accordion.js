import styled from 'styled-components';

const Accordion = styled.button`
  background-color: teal;
  color: white;
  cursor: pointer;
  padding: 1rem;
  width: 100%;
  text-align: left;
  border: 1px solid darkcyan;
  outline: none;
  transition: 0.4s;
  :active {
    background-color: darkcyan;
  }
  :hover {
    background-color: darkcyan;
  }
`;

export default Accordion;
