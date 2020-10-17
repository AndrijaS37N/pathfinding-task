import styled from 'styled-components';

const AppLogo = styled.img`
 animation: app-logo-pulse 2s infinite;
 height: 80px;
 @keyframes app-logo-pulse {
	0% { transform: scale(0.5); }
	70% { transform: scale(1); }
   100% { transform: scale(0.5); }
 }
`;

export default AppLogo;
