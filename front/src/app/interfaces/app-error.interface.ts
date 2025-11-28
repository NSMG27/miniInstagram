import { ErrorType } from "../Core/Constants/http-error.constants";
export interface AppError {
  type: ErrorType;
  statusCode?: number;
  message: string;
  userMessage: string;
  icon: string;
  timestamp: Date;
  originalError?: any;
  shouldRetry: boolean;
}