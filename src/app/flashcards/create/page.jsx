'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

const CreateFlashcards = () => {
	const { data: session } = useSession();
	const router = useRouter();
	const [submitting, setSubmitting] = useState(false);
	const [flashcard, setFlashcard] = useState({
		frontside: '',
		backside: '',
	});
	const [flashcards, setFlashcards] = useState([]);
	const [title, setTitle] = useState('');
	const { toast } = useToast();

	const createFlashcards = async (e) => {
		e.preventDefault();
		setSubmitting(true);
		try {
			const res = await fetch('/api/flashcards/new', {
				method: 'POST',
				body: JSON.stringify({
					userId: session?.user.id,
					title: title,
					flashcards: flashcards,
				}),
			});

			if (res.ok) {
				router.push('/');
			}
			toast({
				title: 'Success!',
				description: 'Your flashcards have been created.',
			});
		} catch (error) {
			console.log(error);
		} finally {
			setFlashcards([]);
			setSubmitting(false);
		}
	};
	const addSingleFlashcard = (e) => {
		e.preventDefault();
		if (flashcard.frontside !== '' && flashcard.backside !== '') {
			setFlashcards((prevFlashcards) => [...prevFlashcards, flashcard]);
			setFlashcard({ frontside: '', backside: '' });
		}
	};
	const removeSingleFlashcard = (index) => {
		const newArray = [...flashcards];
		newArray.splice(index, 1);
		setFlashcards(newArray);
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
							Create your own flashcards and learn from it!
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
									style='hover:text-cl4 text-zinc-800'
								/>
							</div>
						</form>
						{console.log(flashcards)}
						{flashcards.length > 0 ? (
							<Button
								text='Save all'
								onClick={createFlashcards}
								style='hover:bg-cl4 hover:text-cl2 m-6 text-zinc-800'
							/>
						) : (
							false
						)}
					</div>
					<div className='flex flex-col justify-center sm:px-4 my-10 max-w-3xl w-full mx-auto'>
						{/* <table>
					<thead className='font-bold'>
						<tr>
							<td>Frontside</td>
							<td>Backside</td>
						</tr>
					</thead>
					<tbody></tbody>
				</table> */}
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

						{/* <div className='flex flex-col items-center text-xl '>
							<p>{flashcard.frontside}</p>
							<p>{flashcard.backside}</p>
						</div> */}
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
								{flashcards.map((flash, index) => (
									<TableRow key={index + 1}>
										<TableCell className='text-center'>{index + 1}</TableCell>
										<TableCell className='text-center'>
											{flash.frontside}
										</TableCell>
										<TableCell className='text-center'>
											{flash.backside}
										</TableCell>
										<TableCell className='text-center text-lg sm:text-2xl'>
											<button
												onClick={() => removeSingleFlashcard(index)}
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

export default CreateFlashcards;
