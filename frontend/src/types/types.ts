import { AxiosResponse } from "axios";

export interface ResponseQueryObject extends AxiosResponse {
  data: {
    result: [];
  };
}

export interface AcceptRequestDto {
  id: string;
}

export interface MessageData {
  userID: string;
  message: string;
  username: string;
  timestamp?: any;
}
