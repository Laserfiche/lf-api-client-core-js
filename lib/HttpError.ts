/**
 * The HTTP error name
 */
export const HTTPError_NAME = 'HTTPError';

/**
 * An error that contains the HTTP status code
 */
export class HTTPError extends Error {
  /**
   * Constructor
   * @param message The error message
   * @param status The HTTP status code
   */
  constructor(message: string, public status: number) {
    super(message);
    this.name = HTTPError_NAME;
  }
}
