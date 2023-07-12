import './css/SlideIn.css';
const Slide = ({ children, startAnimation, direction }) => {
	let transitionProperties;
	if (direction) {
		transitionProperties = startAnimation
			? { marginLeft: '100px' }
			: { marginLeft: '0px' };
	} else {
		transitionProperties = startAnimation
			? { marginRight: '100px' }
			: { marginRight: '0px' };
	}
	return (
		<div className='slide' style={transitionProperties}>
			{children}
		</div>
	);
};
export default Slide;
