import './globals.css';
import { Roboto } from 'next/font/google';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Provider from './components/Provider';
import { Toaster } from '@/components/ui/toaster';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata = {
	title: 'Flash',
	description: 'Flashcards for learning purposes.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<Provider>
					<main>
						<Nav />
						{children}
						<Toaster />
						<Footer />
					</main>
				</Provider>
			</body>
		</html>
	);
}
