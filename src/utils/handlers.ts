import { Request, Response, NextFunction, RequestHandler } from 'express'

export const wrapAsync = (func: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // tạo ra cấu trúc try|catch
    try {
      await func(req, res, next) // nó phải là await vì func là một promise
    } catch (error) {
      next(error)
    }
  }
}
