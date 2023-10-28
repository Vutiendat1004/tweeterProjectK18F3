import User from './models/schemas/User.schema'
import { Request } from 'express'

// là nơi dùng để định nghĩa lại các thuộc tính có sẵn
declare module 'express' {
  interface Request {
    user?: User
  }
}
