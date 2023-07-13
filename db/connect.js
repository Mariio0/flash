import mongoose from 'mongoose';

const connectDB = async () => {
	mongoose.set('strictQuery', true);

	await mongoose
		.connect(process.env.MONGODB_URI)
		.then(() => {
			console.log('MongoDB connected');
		})
		.catch((error) => console.log(error));
};

export default connectDB;
