import { model, models, Schema } from 'mongoose';

const flashcardsSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	title: {
		type: String,
		required: true,
	},
	flashcards: [
		{
			frontside: String,
			backside: String,
		},
	],
});
const Flashcards = models.Flashcards || model('Flashcards', flashcardsSchema);
export default Flashcards;
