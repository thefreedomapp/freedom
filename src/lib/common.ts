import type { IServer } from "$lib/models/server";

export type SerializedUser = {
	id: string;
	username: string;
	email: string;
	friends: SerializedUser[];
};

export type FriendsResponse = {
	friends: {
		direct: IServer;
		friend: SerializedUser;
	}[];
};
