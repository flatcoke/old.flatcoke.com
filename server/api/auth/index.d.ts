export interface IAccessToken {
  accessToken: string
}

export interface FacebookAccessTokenData {
  id: string | number
  name: string
  email?: string
}

export interface JWTToken {
  accessToken: string
  refreshToken: string
}
