export type SerializedUser = {
	id: string;
	username: string;
	email: string;
	friends: SerializedUser[];
};
