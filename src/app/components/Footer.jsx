import React from 'react';
import { BsCardText } from 'react-icons/bs';

const Footer = () => {
	return (
		<footer className='w-full py-5 flex items-center justify-center mt-24 '>
			<div className='text-cl3 text-xl'>
				{' '}
				&copy;{new Date().getFullYear()} Flashcards
			</div>
		</footer>
	);
};

export default Footer;
