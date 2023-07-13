'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Input from './components/Input';
import Card from './components/Card';
import Loader from './components/Loader';
import Pagination from './components/Pagination';
import Link from 'next/link';
import Button from './components/Button';

const RenderCards = ({ data, info }) => {
	if (data?.length > 0) {
		return data.map((card) => (
			<>
				<div className='relative  '>
					<Card key={card._id} title={card.title} id={card._id} />
					<div className='group cursor-pointer '>
						<Link href={`/profile/${card.creator._id}`}>
							<Image
								src={card.creator.image}
								width={40}
								height={40}
								alt='profile'
								className='rounded-full p-0.5 absolute bottom-3 right-3 '
							/>
							<p className='hidden group-hover:block group-hover:opacity-100 transition absolute rounded-md border border-cl4 px-2 py-1 text-cl4 bg-slate-50 bottom-10 right-2'>
								{card.creator.username}
							</p>
							<p className='absolute bottom-4 left-4 text-zinc-700'>
								{card.flashcards.length} cards
							</p>
						</Link>
					</div>
				</div>
			</>
		));
	}
	return (
		<h2 className='font-bold text-cl3 text-xl uppercase  w-full text-center flex justify-center grid-flow-col'>
			{info}
		</h2>
	);
};

const Home = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [allCards, setAllCards] = useState(null);

	const [searchText, setSearchText] = useState('');
	const [searchedResults, setSearchedResults] = useState(null);
	const [searchTimeout, setSearchTimeout] = useState(null);

	// pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(12);
	const lastPostIndex = currentPage * postsPerPage;
	const firstPostIndex = lastPostIndex - postsPerPage;
	const currentPosts = allCards?.slice(firstPostIndex, lastPostIndex);
	const [cardsLength, setCardsLength] = useState(null);

	const fetchCards = async () => {
		setIsLoading(true);

		try {
			const res = await fetch('/api/flashcards', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				next: { cache: 'no-store' },
			});

			if (res.ok) {
				const result = await res.json();
				console.log(result);
				setAllCards(result);
				setCardsLength(result.length);
			}
		} catch (error) {
			alert(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCards();
	}, []);

	// useEffect(() => {
	// 	const fetchCards = async () => {
	// 		const response = await fetch(`/api/users/${profileId}/flashcards`, {
	// 			next: { revalidate: 10 },
	// 		});
	// 		const data = await response.json();

	// 		setCards(data);
	// 		setCardsLength(data.length);
	// 		setCreator(data[0].creator);
	// 	};
	// 	if (profileId) fetchCards();
	// }, []);

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);

		setSearchText(e.target.value);
		setSearchTimeout(
			setTimeout(() => {
				const searchResults = allCards.filter(
					(card) =>
						card.title.toLowerCase().includes(searchText.toLowerCase()) ||
						card.creator.username
							.toLowerCase()
							.includes(searchText.toLowerCase())
				);
				setSearchedResults(searchResults);
			}, 500)
		);
	};

	return (
		<section className='max-w-7xl mx-auto px-2 mt-20'>
			<div className='flex flex-col items-center justify-center gap-2 px-2'>
				<h1 className=' text-2xl sm:text-3xl xl:text-4xl font-bold text-cl3'>
					User's Cards Showcase
				</h1>
				<p className='mb-8 text-neutral-500 text-md sm:text-lg'>
					You can search for flashcards by title or name of the author. Sign in
					to create your own.
				</p>
				<div className='w-full md:max-w-2xl '>
					<Input
						label='Search flashcards'
						value={searchText}
						onChange={handleSearchChange}
					/>
				</div>
			</div>

			<div className='mt-10'>
				{isLoading ? (
					<div className='flex justify-center items-center'>
						<Loader />
					</div>
				) : (
					<>
						{searchText && (
							<h2 className='font-medium text-[#666e75] text-xl mb-3'>
								Showing results for{' '}
								<span className='text-[#222328]'>{searchText}</span>
							</h2>
						)}
						<div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 mb-8'>
							{searchText ? (
								<RenderCards
									data={searchedResults}
									info='No search results found'
								/>
							) : (
								<>
									<RenderCards data={currentPosts} info='No flashcards found' />
								</>
							)}
						</div>

						<Pagination
							totalPosts={cardsLength}
							postsPerPage={postsPerPage}
							setCurrentPage={setCurrentPage}
						/>
						<Button text={'Reload'} onClick={fetchCards} />
					</>
				)}
			</div>
		</section>
	);
};

export default Home;
