'use client';

import Link from 'next/link';
import { BsCardText } from 'react-icons/bs';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
	const { data: session } = useSession();
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
	useEffect(() => {
		const setUpProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};

		setUpProviders();
	}, []);
	return (
		<nav className='flex justify-between w-full xl:max-w-7xl xl:mx-auto relative px-2'>
			<Link
				href='/'
				className='flex gap-1 p-4 items-center sm:text-2xl text-cl3 text-xl'
			>
				<BsCardText className='sm:text-3xl text-2xl' />
				<p>Flash</p>
			</Link>

			{/* Desktop Nav */}
			<div className='sm:flex hidden '>
				{session?.user ? (
					<div className='flex justify-between items-center gap-2 text-cl3'>
						<Link
							href='/flashcards/create'
							className='font-bold text-lg mx-6 text-cl1 border-2 border-cl3 rounded-lg px-2 py-1 bg-cl3 tracking-wider'
						>
							Create Cards
						</Link>
						<Link
							href={`/profile/${session?.user.id}`}
							className='text-cl3 bg-cl5 text-md flex items-center px-2 py-1 rounded-full'
						>
							<p className='px-1'>{session?.user.name}</p>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								alt='profile'
								className='rounded-full p-0.5'
							/>
						</Link>
						<button
							type='button'
							onClick={signOut}
							className='border border-cl3 text-lg px-4 py-2 rounded-full hover:bg-cl3 hover:text-cl5 transition-colors'
						>
							Sign Out
						</button>
					</div>
				) : (
					<>
						<div className='flex justify-between items-center gap-3 text-cl3'>
							<p className='text-lg text-zinc-800'>Sign in with:</p>
							{providers &&
								Object.values(providers).map((provider) => (
									<button
										type='button'
										key={provider.name}
										onClick={() => {
											signIn(provider.id);
										}}
										className='border border-cl3 text-lg px-3 py-1 rounded-lg hover:bg-cl3 hover:text-slate-100 transition-colors'
									>
										{provider.name}
									</button>
								))}
						</div>
					</>
				)}
			</div>

			{/* Mobile Nav */}
			<div className='sm:hidden flex relative'>
				{session?.user ? (
					<div className='flex justify-between items-center gap-2 text-cl3'>
						<div
							className='text-cl3 bg-cl5 text-md flex items-center px-2 py-1 rounded-full w-full  cursor-pointer'
							onClick={() => {
								setToggleDropdown((prev) => {
									return !prev;
								});
							}}
						>
							<p className='px-1 select-none'>{session?.user.name}</p>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								alt='profile'
								className='rounded-full p-0.5'
							/>
						</div>

						{toggleDropdown && (
							<div className='absolute flex flex-col top-16 bg-cl5 rounded-lg p-4 items-start w-44 gap-1 z-10'>
								<Link href='/profile' onClick={() => setToggleDropdown(false)}>
									My Profile
								</Link>
								<Link
									href='/flashcards/create'
									onClick={() => setToggleDropdown(false)}
								>
									Create flashcards
								</Link>
								<button
									type='button'
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									className='mt-5 border border-cl3 px-2 py-1 rounded-md bg-cl3 text-cl1'
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						<div className='flex justify-between items-center gap-1 text-cl3'>
							<p className='text-black'>Sign in:</p>
							{providers &&
								Object.values(providers).map((provider) => (
									<button
										type='button'
										key={provider.name}
										onClick={() => {
											signIn(provider.id);
										}}
										className='border border-cl3 px-2 py-1 rounded-lg hover:bg-cl3 hover:text-slate-100 transition-colors'
									>
										{provider.name}
									</button>
								))}
						</div>
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
