import React, { useContext, useEffect, useState } from 'react';

const GratitudeContext = React.createContext();

export function useGratitude() {
	return useContext(GratitudeContext);
}

export function GratitudeProvider({ children }) {
	const [gratitude, setGratitude] = useState([]);

	function saveGratitude(gratitude) {
		return setGratitude(gratitude);
	}

	useEffect(() => {
		//Dont really know whats needed here...
		//Getting the following error thats related to this but im too tired to figure it out :-)
		//{Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.}
		return function cleanup() {};
	}, []);

	const value = {
		gratitude,
		saveGratitude,
	};
	return (
		<GratitudeContext.Provider value={value}>
			{children}
		</GratitudeContext.Provider>
	);
}
