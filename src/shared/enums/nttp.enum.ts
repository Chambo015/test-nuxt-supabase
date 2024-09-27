export const enum HttpMethod {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch",
  DELETE = "delete",
}

export const enum StatusCode {
  Success = 200,
  Created = 201,
  BadRequest = 400,
  NotFound = 404,
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
  ValidationError = 422
}
