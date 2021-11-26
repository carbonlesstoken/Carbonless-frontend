export type TSignatureReq = {
  token_address: string;
  amount_to_pay: string;
}

export type TSignatureRes = {
  token_address:	string;
  amount_to_pay:	string;
  amount_to_receive:	string;
  signature_expiration_timestamp:	string;
  signature:	string;
}

export type TAddressRes = {
  "contract address": string;
  "token address": string;
}