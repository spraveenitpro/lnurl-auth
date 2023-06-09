import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
	providers: [
		CredentialsProvider({
			id: "lightning",
			name: "lightning",
			credentials: {
				pubkey: { label: "pubkey", type: "text" },
				k1: { label: "k1", type: "text" },
			},
			async authorize(credentials, req) {
				const { k1, pubkey } = credentials;

				return { k1, pubkey };
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user && user.pubkey && user.k1) {
				// Add the key and k1 from the user object passed from authorize
				token.key = user.pubkey;
				token.k1 = user.k1;
			}
			return token;
		},
		async session({ session, token }) {
			// Add the key and k1 from the token object passed from authorize
			if (token.key && token.k1) {
				session.user.pubkey = token.key;
				session.user.k1 = token.k1;
			}

			return session;
		},
		async redirect({ url, baseUrl }) {
			// Define the redirect callback to redirect the user to the root URL after signing in
			console.log("URL:", url);
			return url.split("/signin")[0];
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: { jwt: true },
	jwt: {
		signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
	},
};

export default NextAuth(authOptions);
