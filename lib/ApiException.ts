import { ProblemDetails } from "./ProblemDetails";

export class ApiException extends Error  {
    message: string;
    status: number;
    headers: { [key: string]: any; };
    problemDetails: ProblemDetails | undefined;

    constructor(message: string, status: number, headers: { [key: string]: any; }, problemDetails: ProblemDetails | undefined) {
      super();

      this.message =  message;
      this.status = status;
      this.headers = headers;
      this.problemDetails = problemDetails
    }

  }
