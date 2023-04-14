import { RequestService } from "./RequestService";
import { AuthService } from "./AuthService";

const request = new RequestService();
const auth = new AuthService();

export { request, auth };
