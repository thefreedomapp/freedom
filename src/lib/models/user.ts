import { type Document, createSchema, getModel, ObjectId, type IServer, Server } from "$lib/models";
import { compareSync, hashSync } from "$lib/bcrypt";
import { emailRegex } from "$lib/common";

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
	friends: ObjectId[];
	/**
	 * @description An array of servers that this user is a member of.
	 */
	servers: ObjectId[];
	/**
	 * @description The ID of the `GridFSBucket` that stores the user's profile picture.
	 */
	profilePicture: ObjectId;

	/**
	 * @description Gets a direct message server for the user and another user.
	 * @description If the server doesn't exist, it will be created.
	 *
	 * @param friend The user to get a direct message server for.
	 * @returns The direct message server.
	 */
	getDirectServer(friend: IUser): Promise<IServer>;

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
		unique: true,
		match: emailRegex
	},
	password: { type: String },
	friends: [
		{
			type: ObjectId,
			ref: "User",
			default: []
		}
	]
});

userSchema.methods.getDirectServer = async function (this: IUser, friend: IUser) {
	let server = await Server.findOne({ users: { $all: [this, friend] }, isDirect: true });
	if (!server) {
		server = new Server({
			name: `${this.name}'s direct messages with ${friend.name}`,
			isDirect: true,
			users: [this, friend]
		});
		await server.save();
	}
	return server;
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
