import { ApiError, ApiErrorType } from '@nc/utils/errors';

interface ExpectedApiError {
  message: string
  status: number
  title: string
}

const executeTriggeringFunction = (triggeringFunction: typeof ApiError) => {
  try {
    triggeringFunction(undefined);
    return null;
  } catch (e) {
    return e;
  }
};

const assertApiError = (error: ApiErrorType | typeof ApiError, expected: ExpectedApiError): jest.CustomMatcherResult => {
  let apiErrorObj: ApiErrorType
  apiErrorObj = (typeof error === 'function') ?
     executeTriggeringFunction(error):error

  const isExpectedErrorType: boolean = apiErrorObj.status === expected.status
  && apiErrorObj.title === expected.title;

  if (!isExpectedErrorType) {
    return {
      pass: false,
      message: () => `expected ApiError<${expected.title}> with message "${expected.message}", received ${JSON.stringify(error)}.`,
    };
  }

  if (apiErrorObj.message !== expected.message) {
    return {
      pass: false,
      message: () => `expected ApiError<${expected.title}> with message "${expected.message}", received unexpected error message: \`${apiErrorObj.message}\`.`,
    };
  }

  return {
    pass: true,
    message: () => '',
  };
};

expect.extend({
  toThrowUnauthorized<T extends ApiErrorType>(receivedError: T, expectedMessage: string) {
    return assertApiError(
      receivedError,
      { message: expectedMessage, status: 401, title: 'Unauthorized' }
    );
  },
  toThrowBadRequest<T extends ApiErrorType>(receivedError: T, expectedMessage: string) {
    return assertApiError(
      receivedError,
      { message: expectedMessage, status: 400, title: 'Bad Request' }
    );
  },
  toThrowNotFound<T extends ApiErrorType>(receivedError: T, expectedMessage: string) {
    return assertApiError(
      receivedError,
      { message: expectedMessage, status: 404, title: 'Not Found' }
    );
  },
  toThrowConflict<T extends ApiErrorType>(receivedError: T, expectedMessage: string) {
    return assertApiError(
      receivedError,
      { message: expectedMessage, status: 409, title: 'Conflict' }
    );
  },
  toThrowInternalError<T extends ApiErrorType>(receivedError: T, expectedMessage: string) {
    return assertApiError(
      receivedError,
      { message: expectedMessage, status: 500, title: 'Internal Server Error' }
    );
  },
});
