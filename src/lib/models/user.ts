import { type Document, createSchema, getModel, ObjectId, type IServer, Server } from "$lib/models";
import { compareSync, hashSync } from "$lib/bcrypt";

export interface IUser extends Document {
	name: string;
	username: string;
	email: string;
	password: string;
	friends: IUser[];

	/**
	 * @description Gets a direct message server for the user and another user.
	 * @description If the server doesn't exist, it will be created.
	 *
	 * @param {IUser} friend The user to get a direct message server for.
	 */
	getDirectServer(friend: IUser): Promise<IServer>;

	/**
	 * @description Generates a token for the user.
	 * @description The token is the same for every invocation of this method unless the user has changed their data.
	 *
	 * @returns {string} The token.
	 */
	generateToken(): string;
	/**
	 * @description Compares a token to the user's token password.
	 *
	 * @param token The token to compare.
	 *
	 * @returns {boolean} True if the token is valid, false otherwise.
	 */
	compareToken(token: string): boolean;

	/**
	 * @description Compares a password to the user's password.
	 *
	 * @param password The password to compare.
	 * @returns {boolean} True if the password matches, false otherwise.
	 */
	comparePassword(password: string): boolean;
}

export const userSchema = createSchema({
	name: { type: String },
	username: { type: String },
	email: { type: String, unique: true },
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
	let server = await Server.findOne({ users: { $all: [this._id, friend._id] }, isDirect: true });
	if (!server) {
		server = new Server({
			name: `${this.name}'s direct messages with ${friend.name}`,
			isDirect: true,
			users: [this._id, friend._id]
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
