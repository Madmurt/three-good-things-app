import { useAuth } from '../contexts/AuthContext';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth();
	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				);
			}}
		></Route>
	);
}

export default PrivateRoute;
