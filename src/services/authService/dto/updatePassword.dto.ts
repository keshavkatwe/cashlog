export interface IUpdatePasswordRequestDto {
  uniqueIdentifier: string;
  password: string;
  otp: string;
}
