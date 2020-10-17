import { css } from 'styled-components';

const gridMediaQueries = ({ sm = '15px', md = '30px', lg = '50px' }) => css`
  grid-template-columns: repeat(10, ${sm});

  @media screen and (min-width: 40em) {
    grid-template-columns: repeat(10, ${md});
  }

  @media screen and (min-width: 52em) {
    grid-template-columns: repeat(10, ${lg});
  }
`;

export default gridMediaQueries;
