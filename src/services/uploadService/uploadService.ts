import {axiosInstance} from '../axiosInstance';
import type {
  IGenerateSignedUrlApiRequestDto,
  IGenerateSignedUrlApiResponseDto,
} from './dto/GenerateSignedUrlApi.dto';

export const generateSignedUrlApi = (
  payload: IGenerateSignedUrlApiRequestDto,
): Promise<IGenerateSignedUrlApiResponseDto> =>
  axiosInstance.post('/upload/generate', payload);

export const uploadFileApi = (
  signedUrl: string,
  file: Blob,
  contentType: string,
) =>
  fetch(signedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: file,
  });
