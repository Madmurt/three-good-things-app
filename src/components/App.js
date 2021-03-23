import { AuthProvider } from '../contexts/AuthContext';
import React from 'react';
import { Container } from 'react-bootstrap';
import Signup from './Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import SharePreview from './SharePreview';
import { GratitudeProvider } from '../contexts/GratitudeContext';

const App = (props) => {
	return (
		<Container
			className='d-flex align-items-center justify-content-center'
			style={{ minHeight: '100vh' }}
		>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Router>
					<AuthProvider>
						<GratitudeProvider>
							<Switch>
								<PrivateRoute
									exact
									path='/'
									component={Dashboard}
								/>
								<PrivateRoute
									path='/update-profile'
									component={UpdateProfile}
								/>
								<PrivateRoute
									path='/share-preview'
									component={SharePreview}
								/>
								<Route path='/signup' component={Signup} />
								<Route path='/login' component={Login} />
								<Route
									path='/forgot-password'
									component={ForgotPassword}
								/>
							</Switch>
						</GratitudeProvider>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
};

// App.propTypes = {

// }

export default App;
