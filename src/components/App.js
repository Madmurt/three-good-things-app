import { AuthProvider } from '../contexts/AuthContext';
import React from 'react';
import { Container } from 'react-bootstrap';
import Signup from './Signup';
// import PropTypes from 'prop-types'

const App = (props) => {
	return (
		<AuthProvider>
			<Container
				className='d-flex align-items-center justify-content-center'
				style={{ minHeight: '100vh' }}
			>
				<div className='w-100' style={{ maxWidth: '400px' }}>
					<Signup />
				</div>
			</Container>
		</AuthProvider>
	);
};

// App.propTypes = {

// }

export default App;
