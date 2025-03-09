import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Defining argument types
interface AddUserArgs {
    input:{
        username: string;
        email: string;
        password: string;
    }
}

interface LoginUserArgs {
    email: string;
    password: string;
}

interface UserArgs {
    username: string;
}

interface AddBookArgs {
    _id: string;
    bookId: string;
    title: string;
    authors: string[];
    description: string;
    image: string;
    link: string;
}

interface RemoveBookArgs {
    userId: string;
    bookId: string;
}

// Resolvers

const resolvers = {
    Query: {
        user: async (_parent: any, {username}: UserArgs) => {
            return User.findOne({username}).sort({createdAt: -1});
        },
        // Gets the user's info
        me: async (_parent: any, _args: any, context: any) => {
            if(context.user){
                return User.findOne({_id: context.user._id});
            }
            throw new AuthenticationError('Could not authenticate user.');
        },
    },
    Mutation: {
        addUser: async (_parent: any, {input}: AddUserArgs) => {
            const user = await User.create({...input});

            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },

        login: async (_parent: any, {email, password}: LoginUserArgs) => {
            const user = await User.findOne({email});

            if(!user){
                throw new AuthenticationError('Could not authenticate user.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){
                throw new AuthenticationError('Could not authenticate user.');
            }

            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        addBook: async (_parent: any, {bookId, title, authors, description, image, link}: AddBookArgs, context: any) => {
            console.log(`The current user: ${context.user.username}, ${context.user.userId}`);
            console.log(`The current user: ${context.user.username}, ${context.user.id}`);
            console.log(`The current user: ${context.user.username}, ${context.user._id}`);
            console.log(`The current book: ${bookId}, ${title}`);
            if(context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {
                        $addToSet: {
                            savedBooks: {bookId, title, authors, description, image, link},
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw AuthenticationError;
        },
        removeBook: async (_parent: any, {bookId}: RemoveBookArgs, context: any) => {
            if(context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {
                        $pull: {
                            savedBooks: {
                                bookId
                            },
                        },
                    },
                    {new: true}
                );
            }
            throw AuthenticationError;
        },
    },
};

export default resolvers;