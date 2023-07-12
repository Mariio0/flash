import connectDB from '@db/connect';
import Flashcards from '@db/models/flashcards';

export const GET = async (request, { params }) => {
	try {
		await connectDB();

		const flashcards = await Flashcards.find({ creator: params.id }).populate(
			'creator'
		);

		return new Response(JSON.stringify(flashcards), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch all flashcards', { status: 500 });
	}
};
