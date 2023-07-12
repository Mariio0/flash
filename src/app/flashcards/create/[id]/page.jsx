'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Input from '@src/app/components/Input';
import Button from '@src/app/components/Button';
import Loader from '@src/app/components/Loader';
import { BsTrash } from 'react-icons/bs';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

const UpdateFlashcards = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const params = useParams();
	const flashcardId = params.id;
	const [cards, setCards] = useState([]);
	const [title, setTitle] = useState('');
	const [creator, setCreator] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [flashcard, setFlashcard] = useState({
		frontside: '',
		backside: '',
	});
	const [cardToChange, setCardToChange] = useState(null);

	const { toast } = useToast();

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

	const updateFlashcards = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		if (!flashcardId) return alert('Flashcards ID not found');

		try {
			const res = await fetch(`/api/flashcards/${flashcardId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					title: title,
					flashcards: cards,
				}),
			});

			if (res.ok) {
				router.push('/');
			}
			toast({
				title: 'Success!',
				description: 'Your flashcards have been updated.',
			});
		} catch (error) {
			console.log(error);
		} finally {
			setSubmitting(false);
		}
	};

	const addSingleFlashcard = (e) => {
		e.preventDefault();
		if (flashcard.frontside !== '' && flashcard.backside !== '') {
			setCards((prevFlashcards) => [...prevFlashcards, flashcard]);
			setFlashcard({ frontside: '', backside: '' });
		}
	};
	const removeSingleFlashcard = (index) => {
		const newArray = [...cards];
		newArray.splice(index, 1);
		setCards(newArray);
	};
	const updateSingleFlashcard = (e) => {
		e.preventDefault();
		if (flashcard.frontside !== '' && flashcard.backside !== '') {
			const before = [...cards].slice(0, cardToChange);
			const after = [...cards].slice(cardToChange + 1);
			setCards([...before, flashcard, ...after]);
			setFlashcard({ frontside: '', backside: '' });
		}
	};

	return (
		<section className='px-2'>
			{submitting ? (
				<div className='mt-20 flex justify-center items-center'>
					<Loader />
				</div>
			) : (
				<>
					<div className='flex items-center flex-col my-10'>
						<h1 className='text-2xl sm:text-3xl text-cl3 font-bold '>
							Flashcards creator
						</h1>
						<p className='sm:text-lg text-cl4'>
							Add, update or delete your flashcards.{' '}
						</p>
						<p className='text-zinc-700 px-3'>
							To update single card scroll down to the table and pick one by
							clicking.
						</p>
					</div>
					<div className='max-w-xl w-full mx-auto'>
						<form className='flex flex-col items-center px-2 sm:px-6'>
							<Input
								label={'Title'}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<div className='w-full'>
								<Input
									label={'Frontside'}
									value={flashcard.frontside}
									onChange={(e) =>
										setFlashcard({ ...flashcard, frontside: e.target.value })
									}
								/>
								<Input
									label={'Backside'}
									value={flashcard.backside}
									onChange={(e) =>
										setFlashcard({ ...flashcard, backside: e.target.value })
									}
								/>
								<Button
									text='Add single flashcard'
									onClick={addSingleFlashcard}
									style='hover:text-cl4 text-zinc-800 mr-4 my-2'
								/>
								<Button
									text='Update flashcard'
									onClick={updateSingleFlashcard}
									style='hover:text-cl4 text-zinc-800 mr-4 my-2'
								/>
								<Button
									text='Clear'
									onClick={(e) => {
										e.preventDefault();
										setFlashcard({ frontside: '', backside: '' });
									}}
									style='hover:text-cl4 text-zinc-800 my-2'
								/>
							</div>
						</form>
						{console.log(cards)}
						{cards.length > 0 ? (
							<Button
								text='Save all'
								onClick={updateFlashcards}
								style='hover:bg-cl4 hover:text-cl2 m-6 text-zinc-800'
							/>
						) : (
							false
						)}
					</div>
					<div className='flex flex-col justify-center sm:px-4 my-10 max-w-3xl w-full mx-auto'>
						<h2 className='text-2xl sm:text-3xl text-cl3 font-bold text-center py-8'>
							Preview of flashcards
						</h2>
						{title !== '' ? (
							<h3 className='text-lg sm:text-xl flex justify-center'>
								Name:
								<span className='text-cl4 font-semibold mx-2'> {title}</span>
							</h3>
						) : (
							''
						)}

						<Table className='text-sm sm:text-lg border-2 text-zinc-800'>
							<TableCaption>A list of your flashcards</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className='font-bold text-center'>No.</TableHead>
									<TableHead className='font-bold text-center '>
										Frontside
									</TableHead>
									<TableHead className='font-bold text-center'>
										Backside
									</TableHead>
									<TableHead className='font-bold text-center'>
										Remove
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{cards.map((flash, index) => (
									<TableRow
										key={index + 1}
										onClick={() => {
											setFlashcard({
												frontside: flash.frontside,
												backside: flash.backside,
											});
											for (let i = 0; i < cards.length; i++) {
												if (cards[i]._id === flash._id) {
													setCardToChange(i);
												}
											}
										}}
										className='cursor-pointer'
									>
										<TableCell className='text-center'>{index + 1}</TableCell>
										<TableCell className='text-center'>
											{flash.frontside}
										</TableCell>
										<TableCell className='text-center'>
											{flash.backside}
										</TableCell>
										<TableCell className='text-center text-lg sm:text-2xl'>
											<button
												onClick={(e) => {
													e.stopPropagation();
													removeSingleFlashcard(index);
												}}
												className='px-4 py-2'
											>
												<BsTrash />
											</button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</>
			)}
		</section>
	);
};

export default UpdateFlashcards;
