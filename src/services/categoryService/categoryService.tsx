import {axiosInstance} from '../axiosInstance';
import type {
  GetCategoryWiseAnalyticsApiResponseDto,
  GetCategoryWiseAnalyticsApiRequestDto,
} from './dto/getCategoryWiseAnalyticsApi.dto';

export const getCategoryWiseAnalyticsApi = (
  req: GetCategoryWiseAnalyticsApiRequestDto,
): Promise<GetCategoryWiseAnalyticsApiResponseDto> =>
  axiosInstance.get('/category/categoryWiseAnalytics', {
    params: req,
  });
