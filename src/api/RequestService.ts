import { DeliveryService } from "./DeliveryService";
import { AxiosError, AxiosResponse } from "axios";

export interface IRequestCollectionResponse {
  items: IParcel[];
  page: number;
  limit: number;
  total: number;
}

export interface IRequestRequestParam {
  page: number;
  id?: string | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export class RequestService {
  #basePath = "requests";

  public async getRequestCollection(
    uid?: string
  ): Promise<AxiosResponse<IRequestCollectionResponse, AxiosError>> {
    // TODO update mock server
    return await DeliveryService.get(this.#basePath, {
      params: {
        uid,
      },
    });
  }
}
