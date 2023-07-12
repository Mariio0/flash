import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '../../../../../db/connect';
import User from '../../../../../db/models/user';

const handler = NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			const sessionUser = await User.findOne({ email: session.user.email });
			session.user.id = sessionUser._id.toString();
			return session;
		},
		async signIn({ profile }) {
			try {
				await connectDB();

				const userExists = await User.findOne({ email: profile.email });

				if (!userExists) {
					await User.create({
						email: profile.email,
						username: profile.name.replace(' ', '').toLowerCase(),
						image: profile.picture,
					});
				}

				return true;
			} catch (error) {
				console.log(error);
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
