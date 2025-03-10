export interface IGenerateSignedUrlApiRequestDto {
  fileName: string;
  contentType: string;
}

export interface IGenerateSignedUrlApiResponseDto {
  signedUrl: string;
  fileName: string;
}
