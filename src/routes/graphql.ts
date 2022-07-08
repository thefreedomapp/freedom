// The apollo server is a middleware located in `vite.config.ts`. This file only contains the graphql data.

import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "apollo-server-core";

const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	# This "Book" type defines the queryable fields for every book in our data source.
	type Book {
		title: String
		author: String
	}

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		books: [Book]
	}
`;

const resolvers = {
	Query: {
		books: () => [
			{
				title: "Harry Potter and the Chamber of Secrets",
				author: "J.K. Rowling"
			}
		]
	}
};

export { typeDefs, resolvers };

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

export default schema;
