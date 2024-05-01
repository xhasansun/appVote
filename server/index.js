const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const users = [
    { id: "1", name: "Hasan SUN", email: "user1@example.com", age: 30, position: "Frontend Dev.", image: "33", rating: 56, skills: ["Next.js", "GraphQL"] },
    { id: "2", name: "Yahya Hindioğlu", email: "user2@example.com", age: 35, position: "Backend Dev.", image: "34", rating: 33, skills: ["PHP", "GO"] },
    { id: "3", name: "Fatih Altun", email: "user3@example.com", age: 40, position: "UI/UX Des.", image: "35", rating: 22, skills: ["Figma", "Adobe XD"] },
    { id: "4", name: "Sedat Korkmaz", email: "user4@example.com", age: 45, position: "Project Lead", image: "36", rating: 32, skills: ["Team Work"] },
    { id: "5", name: "Serdar Göreli", email: "user5@example.com", age: 50, position: "CEO", image: "37", rating: 15, skills: ["Management"] }
];

const resolvers = {
    Query: {
        users: () => users,
        user: (_, { id }) => users.find(user => user.id === id),
        ratings: () => users.map(user => ({ id: user.id, userId: user.id, rating: user.rating }))
    },
    Mutation: {
        rateUser: (_, { userId, rating }) => {
            const userIndex = users.findIndex(user => user.id === userId);
            if (userIndex === -1) {
                throw new Error("User not found");
            }
            users[userIndex].rating += rating;
            return { id: `${userId}-${Date.now()}`, userId, rating };
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
