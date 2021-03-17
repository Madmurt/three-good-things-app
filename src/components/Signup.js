import { useAuth } from '../contexts/AuthContext';
import React, { useRef, useState } from 'react';
import { Alert, Form, Button, Card } from 'react-bootstrap';

export default function Signup() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfimRef = useRef();
	const { signup, currentUser } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const passwordConfirm = passwordConfimRef.current.value;

		if (password !== passwordConfirm) {
			return setError("Password don't match!");
		}

		try {
			setError('');
			setLoading(true);
			await signup(email, password);
		} catch {
			setError('Failed to create an account');
		}

		setLoading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Sign Up</h2>
					{currentUser.email}
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								required
							/>
						</Form.Group>
						<Form.Group id='passwordConfim'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordConfimRef}
								required
							/>
						</Form.Group>
						<Button
							disabled={loading}
							className='w-100'
							type='submit'
						>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Already have an account? Log in
			</div>
		</>
	);
}
