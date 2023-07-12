import React from 'react';

const Button = ({ text, onClick, style }) => {
	return (
		<button
			className={`border-2 px-4 py-2 rounded-md hover:border-cl4 ${style}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
