'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { BsGearFill } from 'react-icons/bs';
import '../../globals.css';
import ReactCardFlip from 'react-card-flip';
import Slide from '@src/app/animations/SlideIn';
import Loader from '@src/app/components/Loader';
import Button from '@src/app/components/Button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import ConfirmDialog from '@src/app/components/ConfirmDialog';

const Flashcard = () => {
	const router = useRouter();
	const params = useParams();
	const flashcardId = params.id;
	const [cards, setCards] = useState([]);
	const [title, setTitle] = useState('');
	const [cardState, setCardState] = useState(0);
	const [creator, setCreator] = useState([]);
	const { data: session } = useSession();
	console.log(flashcardId);
	const [toggleSide, setToggleSide] = useState(true);
	const [startAnimation, setStartAnimation] = useState(false);
	const [direction, setDirection] = useState(false);
	const { toast } = useToast();
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const fetchCards = async () => {
			const response = await fetch(`/api/flashcards/${flashcardId}`);
			const data = await response.json();
			setCards(data.flashcards);
			setTitle(data.title);
			setCreator(data.creator);
			console.log(creator);
		};
		if (flashcardId) fetchCards();
	}, []);

	const handleClick = () => {
		setToggleSide((prev) => !prev);
	};

	const handleDelete = async () => {
		try {
			await fetch(`/api/flashcards/${flashcardId.toString()}`, {
				method: 'DELETE',
			});
			router.push('/');
			toast({
				title: 'Success!',
				description: 'Collection has been deleted.',
			});
		} catch (error) {
			console.log(error);
		}
	};

	console.log(cards);

	return (
		<section className='px-2 sm:px-5 my-20'>
			{cards?.length > 0 ? (
				<>
					<div className='relative flex flex-col max-w-5xl mx-auto w-full '>
						<div className=' text-zinc-800 font-bold flex justify-center items-center gap-2 my-4 relative '>
							<p className='text-2xl sm:text-3xl border w-full md:w-4/5 lg:w-3/4 text-center py-2 rounded-md bg-slate-50 relative'>
								Title: &nbsp; <span className='text-cl3'>{title}</span>{' '}
								{session?.user.id === creator._id ? (
									<div className='absolute right-4 top-1/2 -translate-y-1/2 z-10'>
										<BsGearFill
											className='text-2xl text-cl3 cursor-pointer box-content'
											onClick={() => {
												setToggleDropdown((prev) => {
													return !prev;
												});
											}}
										/>
										{toggleDropdown ? (
											<>
												{' '}
												<div className='absolute -right-4 select-none bg-slate-50 border border-slate-200 flex flex-col gap-2 py-6 px-8 rounded-md mt-5'>
													<p className='mb-5'>Menu</p>
													<Link href={`/flashcards/create/${flashcardId}`}>
														<Button
															text='Edit'
															style={
																'text-xl sm:text-2xl text-cl3 rounded-full bg-slate-100 border border-slate-300 hover:border-slate-200 hover:bg-slate-50 px-7'
															}
														/>
													</Link>

													<ConfirmDialog onClick={handleDelete} />
												</div>
											</>
										) : (
											false
										)}
									</div>
								) : (
									false
								)}
							</p>
						</div>

						<div className='flex justify-center gap-5 my-4 sm:my-6 '>
							<Slide startAnimation={startAnimation} direction={direction}>
								<ReactCardFlip isFlipped={toggleSide} flipDirection='vertical'>
									<div
										onClick={handleClick}
										className='w-[300px] xs:w-[400px] sm:w-[540px] md:w-[700px] h-60 sm:h-[360px] md:h-[420px] flex justify-center items-center bg-amber-100  rounded-md shadow-lg cursor-pointer select-none'
									>
										<p className='text-3xl sm:text-4xl '>
											{cards.length > 0 ? cards[cardState].backside : ''}
										</p>
									</div>
									<div
										onClick={handleClick}
										className='w-[300px] xs:w-[400px] sm:w-[540px] md:w-[700px] h-60 sm:h-[360px] md:h-[420px] flex justify-center items-center bg-amber-100  rounded-md shadow-lg cursor-pointer select-none'
									>
										<p className='text-3xl sm:text-4xl'>
											{cards.length > 0 ? cards[cardState].frontside : ''}
										</p>
									</div>
								</ReactCardFlip>
							</Slide>
						</div>

						<div className='flex justify-around'>
							<button
								onClick={() => {
									setTimeout(() => {
										cardState == 0
											? setCardState(cards.length - 1)
											: setCardState(cardState - 1);
									}, 150);
									setToggleSide(true);
									setDirection(true);
									setStartAnimation((prev) => !prev);
									setTimeout(() => {
										setStartAnimation((prev) => !prev);
									}, 200);
								}}
								className='p-3 sm:p-5 rounded-full bg-slate-50 text-cl3 border border-slate-200 flex items-center hover:bg-slate-100'
							>
								<AiOutlineArrowLeft className='text-xl sm:text-2xl' />
							</button>
							<div className='p-3 sm:p-5 rounded-full bg-slate-50 text-cl3 border border-slate-200 flex items-center select-none'>
								{cardState + 1}/{cards.length}
							</div>
							<button
								onClick={() => {
									setTimeout(() => {
										cardState == cards.length - 1
											? setCardState(0)
											: setCardState(cardState + 1);
									}, 200);
									setToggleSide(true);
									setDirection(false);
									setStartAnimation((prev) => !prev);
									setTimeout(() => {
										setStartAnimation((prev) => !prev);
									}, 150);
								}}
								className='p-3 sm:p-5 rounded-full bg-slate-50 text-cl3 border border-slate-200 flex items-center hover:bg-slate-100'
							>
								<AiOutlineArrowRight className='text-xl sm:text-2xl' />
							</button>
						</div>
					</div>
				</>
			) : (
				<div className='flex justify-center items-center h-48 w-full'>
					<Loader />
				</div>
			)}
		</section>
	);
};

export default Flashcard;
