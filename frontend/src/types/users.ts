export interface UserItem {
  username: string;
  email: string;
  profileURL: string;
  _id: string;
}

export interface DisplayFriendsItem {
  username: string;
  sentFriendRequest: boolean;
  _id: string;
}

export interface FriendRequestSuccess {
  message: string;
  duplicate: boolean;
}

export interface FriendRequestError {
  message: string;
  duplicate: boolean;
}
