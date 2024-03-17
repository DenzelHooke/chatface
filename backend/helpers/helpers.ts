import userModel from "../models/UserModel";
import { IUser } from "../models/UserModel";

export const accountCreationSuccessMessage = () => {
  return "Account created successfully";
};

export const hasNoFriendRequests = (recipient: IUser, sender: IUser) => {
  let isValid = true;

  if (!sender.friendRequestsSent) {
    return true;
  }

  sender.friendRequestsSent.forEach((id) => {
    // If recipient already has a request from user
    if (id === recipient.id) {
      isValid = false;
    }
  });

  return isValid;
};
