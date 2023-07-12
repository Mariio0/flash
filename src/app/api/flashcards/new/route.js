import connectDB from '../../../../../db/connect';
import Flashcards from '../../../../../db/models/flashcards';

export const POST = async (req) => {
	const { userId, title, flashcards } = await req.json();

	try {
		await connectDB();
		const newFlashcards = new Flashcards({
			creator: userId,
			title,
			flashcards,
		});

		await newFlashcards.save();

		return new Response(JSON.stringify(newFlashcards), { status: 201 });
	} catch (error) {
		return new Response('Failed to create a new flashcards', { status: 500 });
	}
};
