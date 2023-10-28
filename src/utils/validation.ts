import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { EntityError, ErrorWithStatus } from '~/models/Errors'

export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validations.run(req)

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const errorObject = errors.mapped()
    const entityError = new EntityError({ errors: {} })
    // xử lí errorObject
    for (const key in errorObject) {
      // lấy msg từng cái lỗi
      const { msg } = errorObject[key]
      // nếu msg có dạng errorwithstatus và stastus !== 422 thì ném cho default error handler
      if (msg instanceof ErrorWithStatus && msg.status !== 422) {
        return next(msg)
      }
      // lỗi 422 thì lưu vào entityError
      entityError.errors[key] = msg
    }
    // ở đây nó xử lí lỗi luôn , chứ không ném về error tổng handler
    next(entityError)
  }
}
