import BaseRpc from "./BaseRpc";
import axios, { AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true; // this is required to be able receive the cookies tokens
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export class UserModuleRpc extends BaseRpc {
  public async login(
    userLoginRequest: any,
    config: AxiosRequestConfig = {}
  ): Promise<any> {
    const url = `${this.baseUrl}/authentication/dj-rest-auth/login/`;

    if (config.headers == null) {
      config.headers = {
        "Content-Type": "application/json",
      };
    }

    try {
      const response = await axios.post<any>(url, userLoginRequest, config);

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data;
      } else {
        throw Object.assign(new Error("Something went wrong"), { code: 402 });
      }
    }
  }
}

export default UserModuleRpc;
