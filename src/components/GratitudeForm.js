import React, { useRef, useState } from 'react';
import { Alert, Form, Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useGratitude } from '../contexts/GratitudeContext';

export default function GratitudeForm() {
	const firstGratitudeRef = useRef();
	const secondGratitudeRef = useRef();
	const thirdGratitudeRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [gratitude, setGratitude] = useState([]);
	const history = useHistory();
	const { saveGratitude } = useGratitude();

	function setGratitudeArray() {
		const gratitudeArray = [];
		gratitudeArray.push(firstGratitudeRef.current.value);
		secondGratitudeRef &&
			gratitudeArray.push(secondGratitudeRef.current.value);
		thirdGratitudeRef &&
			gratitudeArray.push(thirdGratitudeRef.current.value);
		return gratitudeArray;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setError('');
			setLoading(true);
			await saveGratitude(setGratitudeArray());
			history.push('/share-preview');
		} catch {
			setError('Failed to save');
		}

		setLoading(false);
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>
						What are you grateful for today?
					</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>First...</Form.Label>
							<Form.Control
								type='text'
								ref={firstGratitudeRef}
								required
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Second...</Form.Label>
							<Form.Control
								type='text'
								ref={secondGratitudeRef}
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Third...</Form.Label>
							<Form.Control type='text' ref={thirdGratitudeRef} />
						</Form.Group>
						<Button
							disabled={loading}
							className='w-100'
							type='submit'
						>
							Save
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
}
