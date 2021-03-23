import { useGratitude } from '../contexts/GratitudeContext';
import { ListGroup } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SharePreview() {
	const { gratitude } = useGratitude();

	return (
		<>
			<div className='w-100'>
				<h2>I'm grateful for...</h2>
				<ListGroup>
					{gratitude.map((item) => (
						<ListGroup.Item key={uuidv4()}>{item}</ListGroup.Item>
					))}
				</ListGroup>
			</div>
			<div className='w-100 text-center mt-2'>
				<Link to='/'>Go Back</Link>
			</div>
		</>
	);
}
