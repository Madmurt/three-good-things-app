import { useGratitude } from '../contexts/GratitudeContext';
import { ListGroup, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';
import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';

export default function SharePreview() {
	const { gratitude } = useGratitude();

	const SaveImage = () => {
		var node = document.getElementById('imageSectionId');

		htmlToImage
			.toPng(node)
			.then(function (dataUrl) {
				var img = new Image();
				img.src = dataUrl;
				document.body.appendChild(img);
			})
			.catch(function (error) {
				console.error('oops, something went wrong!', error);
			});
	};

	const clearDocument = () => {
		const arr = document.querySelectorAll('img');
		arr.forEach((item) => {
			item.parentNode.removeChild(item);
		});
	};
	return (
		<>
			<div id='imageSectionId' className='imageBackground'>
				<h2 className='image-header'>I'm grateful for...</h2>
				{gratitude.map((item) => (
					<h3 className='image-text' key={uuidv4()}>
						{item}
					</h3>
				))}
			</div>
			<Button className='w-100' type='save' onClick={SaveImage}>
				Save Image
			</Button>
			<div className='w-100 text-center mt-2'>
				<Link to='/' onClick={clearDocument}>
					Go Back
				</Link>
			</div>
		</>
	);
}
