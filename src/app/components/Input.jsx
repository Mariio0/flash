import React from 'react';

const Input = ({ label, value, onChange }) => {
	return (
		<div className='relative my-3 w-full'>
			<label className='absolute text-sm text-cl4 left-2 top-1'>{label}</label>
			<input
				type='text'
				className='flex items-center rounded-md text-xl text-cl4 w-full h-full p-2 pt-6 bg-amber-50 border focus:outline-none focus:border-cl4 '
				value={value}
				onChange={onChange}
			/>
		</div>
	);
	// xl:w-[500px]
};

export default Input;
