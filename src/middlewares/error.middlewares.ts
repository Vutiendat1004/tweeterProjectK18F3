import { Request, Response, NextFunction } from 'express'
import { keyBy, omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // lỗi từ các nơi đổ về
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }
  // nếu không lọt vào if ở trên thì tức là error này là lỗi mặc định
  // nam, message, stack mà 3 thằng này có enumerable là false => chuyển lại thành true
  Object.getOwnPropertyNames(err).forEach((key) => {
    // lấy ra thuộc tính của error 3 thằng
    Object.defineProperty(err, key, { enumerable: true })
  })
  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfor: omit(err, ['stack'])
  })
}
