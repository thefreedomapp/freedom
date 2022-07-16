import { model, Document, Schema, models, Model, Types } from "mongoose";
import { compareSync, hashSync } from "$lib/bcrypt";

export interface IUser extends Document {
	name: string;
	username: string;
	email: string;
	password: string;
	friends: IUser[];

	_id: Types.ObjectId;

	/**
	 * @description Gets the `createdAt` timestamp
	 *
	 * @returns {Date}
	 */
	createdAt(): Date;

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

export const userSchema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			default: []
		}
	]
});

userSchema.methods.createdAt = function (this: IUser) {
	return this._id.getTimestamp();
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

export const User = (models.User as Model<IUser> | undefined) ?? model<IUser>("User", userSchema);
export default User;
