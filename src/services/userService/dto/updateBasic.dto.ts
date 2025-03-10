export interface IUpdateBasicRequestDto {
  firstName: string;
  lastName: string;
  password?: string;
  dob: string;
  isTcAccepted: boolean;
}
