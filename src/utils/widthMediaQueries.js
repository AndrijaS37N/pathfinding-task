import { css } from 'styled-components';

const widthMediaQueries = ({ sm = '100%', md = '50%', lg = '25%' }) => css`
  width: ${sm};

  @media screen and (min-width: 40em) {
    width: ${md};
  }

  @media screen and (min-width: 52em) {
    width: ${lg};
  }
`;

export default widthMediaQueries;
