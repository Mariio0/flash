import connectDB from '@db/connect';
import Flashcards from '@db/models/flashcards';

export const GET = async (request, { params }) => {
	try {
		await connectDB();
		const flashcard = await Flashcards.findById(params.id).populate('creator');
		if (!flashcard) return new Response('Card not found!', { status: 404 });

		return new Response(JSON.stringify(flashcard), { status: 200 });
	} catch (error) {
		return new Response('Failed to fetch flashcard', { status: 500 });
	}
};

export const PATCH = async (request, { params }) => {
	const { title, flashcards } = await request.json();
	try {
		await connectDB();

		const existingPost = await Flashcards.findById(params.id);

		if (!flashcards)
			return new Response('Flashcards not found', { status: 404 });
		existingPost.flashcards = flashcards;
		existingPost.title = title;
		await existingPost.save();

		return new Response(JSON.stringify(existingPost), { status: 200 });
	} catch (error) {
		return new Response('Failed to update the flashcards', { status: 500 });
	}
};

export const DELETE = async (request, { params }) => {
	try {
		await connectDB();
		await Flashcards.findByIdAndRemove(params.id);
		return new Response('Flashcards deleted successfully', { status: 200 });
	} catch (error) {
		return new Response('Failed to delete', { status: 500 });
	}
};
