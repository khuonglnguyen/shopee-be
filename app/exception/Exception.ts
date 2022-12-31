export enum ErrorCode{
    ParamsExceptionCode = 611000,
    DataNotFoundExceptionCode = 611001,
    NoPermissionExceptionCode = 611002,
    BusinessProcessingFailedExceptionCode = 611003,
    DataAlreadyExistsExceptionCode = 611004
  }
  
  export default class Exception {
    public static ParamsException(message: string) {
      throw {
        code: ErrorCode.ParamsExceptionCode,
        message,
      };
    }
    public static DataNotFoundException(message: string) {
      throw {
        code: ErrorCode.DataNotFoundExceptionCode,
        message,
      };
    }
    public static NoPermissionException(message: string) {
      throw {
        code: ErrorCode.NoPermissionExceptionCode,
        message,
      };
    }
    public static BusinessProcessingFailedException(message: string) {
      throw {
        code: ErrorCode.BusinessProcessingFailedExceptionCode,
        message,
      };
    }
    public static DataAlreadyExistsException(message: string) {
      throw {
        code: ErrorCode.DataAlreadyExistsExceptionCode,
        message,
      };
    }
  }
  