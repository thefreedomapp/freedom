export type SerializedUser = {
	id: string;
	username: string;
	email: string;
	friends: SerializedUser[];
};

export type FriendsResponse = {
	friends: {
		direct: string;
		friend: SerializedUser;
	}[];
};
