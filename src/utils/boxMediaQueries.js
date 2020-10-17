import { css } from 'styled-components';

const boxMediaQueries = ({ sm = '3rem', md = '2rem', lg = '1rem' }) => css`
    width: ${lg};
    height: ${lg};
    line-height: ${lg};
    font-size: 5px;

  @media screen and (min-width: 40em) {
    width: ${md};
    height: ${md};
    line-height: ${md};
    font-size: 10px;
  }

  @media screen and (min-width: 52em) {
    width: ${sm};
    height: ${sm};
    line-height: ${sm};
    font-size: 15px;
  }
`;

export default boxMediaQueries;
