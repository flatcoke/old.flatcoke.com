import { Request } from 'hapi'

interface UserToken {
  id: number
  username: string
  email: string
}

const validate = async function(decoded: UserToken, _request: Request) {
  return { isValid: decoded.id !== undefined }
}

export { validate }
