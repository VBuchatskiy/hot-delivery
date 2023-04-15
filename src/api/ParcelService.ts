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

  public async getRequestCollection(): Promise<
    AxiosResponse<IRequestCollectionResponse, AxiosError>
  > {
    return await DeliveryService.get(this.#basePath);
  }
}
