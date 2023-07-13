'use client';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Card from '@src/app/components/Card';
import Pagination from '@src/app/components/Pagination';
import Loader from '@src/app/components/Loader';

const Profile = () => {
	const { data: session } = useSession();
	const params = useParams();
	const profileId = params.id;
	const [cards, setCards] = useState([]);
	const [creator, setCreator] = useState({});

	// pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(6);
	const lastPostIndex = currentPage * postsPerPage;
	const firstPostIndex = lastPostIndex - postsPerPage;
	const currentPosts = cards?.slice(firstPostIndex, lastPostIndex);
	const [cardsLength, setCardsLength] = useState(null);

	useEffect(() => {
		const fetchCards = async () => {
			const response = await fetch(`/api/users/${profileId}/flashcards`, {
				next: { revalidate: 10 },
			});
			const data = await response.json();
			
			setCards(data);
			setCardsLength(data.length);
			setCreator(data[0].creator);
		};
		if (profileId) fetchCards();
	}, []);

	return (
		<section className=' max-w-7xl mx-auto px-2 mt-20 first-letter:sm:mt-28'>
			{cards?.length > 0 ? (
				<>
					<div className='flex flex-col items-center justify-center gap-2 px-2'>
						<h2 className=' text-2xl sm:text-4xl font-bold text-cl3'>
							{session?.user.id == profileId ? 'My ' : creator.username + `'s`}{' '}
							profile
						</h2>
					</div>
					<div className='flex flex-col items-center justify-center mt-4 rounded-xl bg-slate-100 p-10 max-w-xl w-full mx-auto'>
						<Image
							src={creator.image}
							width={120}
							height={120}
							alt='profile'
							className='rounded-full shadow-xl border-4 border-cl3 shadow-cl3/90 my-5'
						/>
						<p className=' text-cl4 mt-4'>Name:</p>
						<p className=' text-cl3 sm:text-lg'>{creator.username}</p>
						{session?.user.id == profileId && (
							<>
								<p className=' text-cl4 mt-4'>Email:</p>
								<p className=' text-cl3 sm:text-lg'>{creator.email}</p>
							</>
						)}
						{currentPosts ? (
							<>
								<p className=' text-cl4 mt-10 sm:text-lg'>Cards created:</p>

								<div className='my-4 flex flex-wrap justify-center'>
									{currentPosts.map((card) => (
										<Card key={card._id} title={card.title} id={card._id} />
									))}
								</div>

								<Pagination
									totalPosts={cardsLength}
									postsPerPage={postsPerPage}
									setCurrentPage={setCurrentPage}
								/>
							</>
						) : (
							false
						)}
					</div>
				</>
			) : (
				<div className='flex justify-center items-center'>
					<Loader />
				</div>
			)}
		</section>
	);
};

export default Profile;
