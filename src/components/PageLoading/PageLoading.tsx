import {Box} from '../Box';
import {Loader} from '../Loader';
import {Typography} from '../Typography';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {StyledBlur} from '../BottomSheet/BottomSheet.styles';
import React from 'react';

interface IPageLoadingProps {
  title?: string;
}
const PageLoading = ({title = 'Loading...'}: IPageLoadingProps) => (
  <Box ph={DEFAULT_CONTAINER_PADDING} flex={1} justifyContent={'center'}>
    <StyledBlur blurAmount={2} blurType="dark" />
    <Box
      bgColor={'purpleLighter'}
      br={'br10'}
      alignItems={'center'}
      pb={'20px'}>
      <Box height={'80px'} width={'100px'}>
        <Loader />
      </Box>
      <Typography variant={'lead'}>{title}</Typography>
    </Box>
  </Box>
);
export default PageLoading;
