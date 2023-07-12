import React from 'react';
import Link from 'next/link';
const Card = ({ id, title }) => {
	return (
		<Link href={`/flashcards/${id}`}>
			<div className=' bg-amber-50 text-cl4 text-xl font-bold px-4 py-16  min-w-[200px] text-center rounded-md border-2 cursor-pointer hover:bg-amber-100'>
				<p className='pb-4'>{title}</p>
			</div>
		</Link>
	);
};

export default Card;
