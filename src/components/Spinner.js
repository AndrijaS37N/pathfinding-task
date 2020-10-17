import styled from 'styled-components';

const Spinner = styled.div`
	border: 0.3rem solid white;
	border-radius: 50%;
	border-top: 0.3rem solid teal;
	width: 1rem;
	height: 1rem;
	-webkit-animation: spin 2s linear infinite;
	animation: spin 2s linear infinite;
	margin-left: 0.5rem;

	@-webkit-keyframes spin {
	0% { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
	}

	@keyframes spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
	}
`;

export default Spinner;
