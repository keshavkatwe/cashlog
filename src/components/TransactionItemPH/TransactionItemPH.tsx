import {Box} from '../Box';

interface TransactionItemPHProps {
  isShowPostTitle?: boolean;
  isShowIcon?: boolean;
}
const TransactionItemPH = ({
  isShowPostTitle,
  isShowIcon,
}: TransactionItemPHProps) => (
  <Box flexDir={'row'} alignItems={'center'}>
    {isShowIcon && (
      <Box
        height={'46px'}
        width={'46px'}
        bgColor={'placeholderBg'}
        br={'br10'}
        mr={'14px'}
      />
    )}
    <Box flex={1} pr={'14px'}>
      <Box
        height={'20px'}
        width={'200px'}
        bgColor={'placeholderBg'}
        br={'br10'}
      />

      {isShowPostTitle && (
        <Box
          height={'18px'}
          bgColor={'placeholderBg'}
          mt={'6px'}
          br={'br10'}
          width={'100px'}
        />
      )}
    </Box>
    <Box height={'20px'} width={'60px'} bgColor={'placeholderBg'} br={'br10'} />
  </Box>
);
export default TransactionItemPH;
