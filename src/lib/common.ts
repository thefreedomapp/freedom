import type { IChat } from "$lib/models/chat";

export type SerializedUser = {
	id: string;
	username: string;
	email: string;
	friends: SerializedUser[];
};

export type FriendsResponse = {
	friends: {
		direct: IChat;
		friend: SerializedUser;
	}[];
};
