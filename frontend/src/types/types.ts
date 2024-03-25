import { AxiosResponse } from "axios";

export interface ResponseQueryObject extends AxiosResponse {
  data: {
    result: [];
  };
}

export interface AcceptRequestDto {
  id: string;
}
