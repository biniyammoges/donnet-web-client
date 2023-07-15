export class ErrorResponse {
     message?: string;
     statusCode?: string;
     error?: string;

     constructor(data: Partial<ErrorResponse>) {
          Object.assign(this, data);
     }
}