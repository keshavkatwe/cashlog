import {Box} from '../Box';
import type {PropsWithChildren} from 'react';
import {Typography} from '../Typography';

interface HeaderTitleProps {
  subTitle?: string;
}
const HeaderTitle = ({
  children,
  subTitle,
}: PropsWithChildren<HeaderTitleProps>) => (
  <Box>
    <Typography variant={'h3'}>{children}</Typography>
    {subTitle && <Typography color={'placeholder'}>{subTitle}</Typography>}
  </Box>
);
export default HeaderTitle;
