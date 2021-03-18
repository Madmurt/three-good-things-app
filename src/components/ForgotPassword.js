import { useAuth } from '../contexts/AuthContext';
import React, { useRef, useState } from 'react';
import { Alert, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function LOgin() {
	const emailRef = useRef();
	const { passwordReset } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		const email = emailRef.current.value;

		try {
			setMessage('');
			setError('');
			setLoading(true);
			await passwordReset(email);
			setMessage('Check your email for further instructions.');
		} catch {
			setError('Failed to reset password');
		}

		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Reset Password</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					{message && <Alert variant='success'>{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
							/>
						</Form.Group>
						<Button
							disabled={loading}
							className='w-100'
							type='submit'
						>
							Reset Password
						</Button>
						<div className='w-100 text-center mt-2'>
							<Link to='/login'>Login</Link>
						</div>
					</Form>
				</Card.Body>
				<div className='w-100 text-center mt-2'>
					Don't have an account? <Link to='/signup'>Sign Up!</Link>
				</div>
			</Card>
		</>
	);
}
