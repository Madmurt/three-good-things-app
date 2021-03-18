import { useAuth } from '../contexts/AuthContext';
import React, { useRef, useState } from 'react';
import { Alert, Form, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfimRef = useRef();
	const { currentUser, updateEmail, updatePassword } = useAuth();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const passwordConfirm = passwordConfimRef.current.value;

		if (password !== passwordConfirm) {
			return setError("Password don't match!");
		}

		const promises = [];
		setLoading(true);
		if (email !== currentUser.email) {
			promises.push(updateEmail(email));
		}
		if (password) {
			promises.push(updatePassword(password));
		}

		Promise.all(promises)
			.then(() => {
				history.push('/');
			})
			.catch(() => {
				setError('Profile update failed');
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Update Profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
								defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								placeholder='Leave blank to keep the same'
							/>
						</Form.Group>
						<Form.Group id='passwordConfim'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordConfimRef}
								placeholder='Leave blank to keep the same'
							/>
						</Form.Group>
						<Button
							disabled={loading}
							className='w-100'
							type='submit'
						>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<Link to='/'>Cancel</Link>
			</div>
		</>
	);
}
