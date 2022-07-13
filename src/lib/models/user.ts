import { model, Document, Schema, models, Model } from "mongoose";
import { connect } from "$lib/models";
import { compareSync, hash, hashSync } from "$lib/bcrypt";

await connect();

export interface IUser extends Document {
	name: string;
	username: string;
	email: string;
	password: string;
	createdAt: Date;

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
	 */
	compareToken(token: string): boolean;

	comparePassword(password: string): boolean;
}

export const userSchema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now
	}
});

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
