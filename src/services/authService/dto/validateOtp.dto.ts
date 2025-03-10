export interface IValidateOtpRequestDto {
  uniqueRequestId: string;
  otp: number;
  isNewUser?: boolean;
}
