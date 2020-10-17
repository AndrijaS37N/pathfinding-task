import { css } from 'styled-components';

const flexMediaQueries = ({ sm = '8rem', md = '4rem', lg = '1rem' }) => css`
    display: flex;
    flex-direction: column;
    border: 2px solid teal;
    margin-left: ${lg};
    margin-right: ${lg};
    font-size: 1.2rem;

  @media screen and (min-width: 40em) {
    margin-left: ${md};
    margin-right: ${md};
    font-size: 2rem;
  }

  @media screen and (min-width: 52em) {
    margin-left: ${sm};
    margin-right: ${sm};
    font-size: 3rem;
  }
`;

export default flexMediaQueries;
