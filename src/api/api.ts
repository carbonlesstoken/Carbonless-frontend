import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
import { TAddressRes, TokensI, TSignatureReq, TSignatureRes } from "../types";
import { URL } from "../appConstants";


const client: AxiosInstance = axios.create({
  baseURL: `https://carbonlesstoken.net/api/v1/`,
  // headers: {
  //   'Authorization': `Basic ${orRamperApiKey}`,
  // }
});

export default async function ajax(
  requestConfig: AxiosRequestConfig,
) {
  try {
    return await client(requestConfig);
  } catch(err) {
    throw err;
  }
}


export const baseApi = {
    signature(data: TSignatureReq): Promise<AxiosResponse<TSignatureRes>> {
        return ajax({
            method: 'post',
            url: URL.signature,
            data,
        })
    },

    getAddress(): Promise<AxiosResponse<TAddressRes[]>> {
        return ajax({
            method: 'get',
            url: URL.address,
        })
    },

    getTokens(): Promise<AxiosResponse<TokensI[]>> {
        return ajax({
            method: 'get',
            url: URL.tokens,
        })
    },
}

