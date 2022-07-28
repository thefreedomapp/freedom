import { type Document, createSchema, getModel, ObjectId, type IChat, Chat } from "$lib/models";
import { compareSync, hashSync } from "$lib/bcrypt";

export interface IUser extends Document {
	/**
	 * @description The name of the user.
	 */
	name: string;
	/**
	 * @description The username of the user.
	 * @remarks This is unique and cannot be changed.
	 */
	username: string;
	/**
	 * @description The email address of the user.
	 * @remarks This is unique, but can be changed.
	 */
	email: string;
	/**
	 * @discription The hashed password.
	 */
	password: string;
	/**
	 * @description An array of user IDs that this user is friends with.
	 */
	friends: IUser[];
	/**
	 * @description An array of chats that this user is a member of.
	 */
	chats: IChat[];
	/**
	 * @description The ID of the `GridFSBucket` that stores the user's profile picture.
	 */
	profilePicture: ObjectId;

	/**
	 * @description Gets a direct message chat for the user and another user.
	 * @description If the chat doesn't exist, it will be created.
	 *
	 * @param friend The user to get a direct message chat for.
	 * @returns The direct message chat.
	 */
	getDirectChat(friend: IUser): Promise<IChat>;

	/**
	 * @description Generates a token for the user.
	 * @description The token is the same for every invocation of this method unless the user has changed their data.
	 *
	 * @returns The token.
	 */
	generateToken(): string;
	/**
	 * @description Compares a token to the user's token password.
	 *
	 * @param token The token to compare.
	 * @returns True if the token is valid, false otherwise.
	 */
	compareToken(token: string): boolean;

	/**
	 * @description Compares a password to the user's password.
	 *
	 * @param password The password to compare.
	 * @returns True if the password matches, false otherwise.
	 */
	comparePassword(password: string): boolean;
}

export const userSchema = createSchema({
	name: { type: String },
	username: { type: String, unique: true },
	email: {
		type: String,
		unique: true
	},
	password: { type: String },
	friends: [
		{
			type: ObjectId,
			ref: "User",
			default: []
		}
	],
	chats: [
		{
			type: ObjectId,
			ref: "Chat",
			default: []
		}
	]
});

userSchema.methods.getDirectChat = async function (this: IUser, friend: IUser) {
	let chat = await Chat.findOne({ users: { $all: [this, friend] }, isDirect: true });
	if (!chat) {
		chat = new Chat({
			name: `${this.name}'s direct messages with ${friend.name}`,
			isDirect: true,
			messages: []
		});
		await chat.save();

		this.chats.push(chat);
		await this.save();
		friend.chats.push(chat);
		await friend.save();
	}
	chat = await chat.populate("messages");
	console.log(chat);
	return chat;
};

// TODO: use something like OAuth2 to generate a token
userSchema.methods.generateToken = function (this: IUser) {
	return hashSync(`${this.email}╬${this.password}╬${this._id}`);
};
userSchema.methods.compareToken = function (this: IUser, token: string) {
	return compareSync(`${this.email}╬${this.password}╬${this._id}`, token);
};

userSchema.methods.comparePassword = function (this: IUser, password: string) {
	return compareSync(password, this.password);
};

export const User = getModel<IUser>("User", userSchema);
