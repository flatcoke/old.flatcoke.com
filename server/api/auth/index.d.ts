export interface IAccessToken {
  accessToken: string
}

export interface IRefreshToken {
  refreshToken: string
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

export interface IAuthCredentials {
  id: number
  email: string | null
  username: string
  createdAt: Date
  iat: number
  exp: number
}
