import { ProblemDetails } from "./ProblemDetails.js";
const OPERATION_ID_HEADER: string = "x-requestid";

export class ApiException extends Error  {
    message: string;
    status: number;
    headers: { [key: string]: any; };
    problemDetails: ProblemDetails;

    constructor(message: string, status: number, headers: { [key: string]: any; }, problemDetails: ProblemDetails | null) {
      super();

      this.message =  message;
      this.status = status;
      this.headers = headers;
      this.problemDetails = problemDetails != null && problemDetails.status !== undefined ? problemDetails : ProblemDetails.fromJS({
        "title": message ?? "HTTP status code " + status,
        "status": status,
        "operationId": headers[OPERATION_ID_HEADER],
      });
    }

  }
