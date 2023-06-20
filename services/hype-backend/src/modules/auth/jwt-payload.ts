export interface JWTPayload {
  address: string;
  nonce: number;
}

export interface JWTResponse {
  accessToken: string;
}
