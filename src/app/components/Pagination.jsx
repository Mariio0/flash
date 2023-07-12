import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage }) => {
	let pages = [];
	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pages.push(i);
	}
	return (
		<div className='flex w-full justify-center'>
			{pages.map((page, index) => {
				return (
					<button
						key={index}
						className='bg-slate-50 border border-slate-200 text-cl3 font-bold w-12 h-12 p-2 m-1 rounded-full'
						onClick={() => {
							setCurrentPage(page);
						}}
					>
						{page}
					</button>
				);
			})}
		</div>
	);
};

export default Pagination;
