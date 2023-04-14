import { DeliveryService } from "./DeliveryService";
import { AxiosError, AxiosResponse } from "axios";

export class AuthService {
  #basePath = "auth";

  public async getProfile(): Promise<AxiosResponse<IProfile, AxiosError>> {
    return await DeliveryService.get(this.#basePath.concat("/profile"));
  }
}
