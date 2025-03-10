import {
  BottomSheet,
  Box,
  Button,
  Divider,
  SelectInputBox,
  SelectInputMultipleBox,
  Typography,
} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {LocalSvg} from 'react-native-svg';
import {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../store';
import {setTransactionFilters} from '../../store/slices/transactionFilterSlice';
import type IDateRangeType from '../../types/IDateRangeType';
import {dateRangeLabels} from '../../constants/transactions';

interface TransactionFilterWidgetProps {
  onClose: () => void;
  isShowCategoryFilters?: boolean;
}
const TransactionFilterWidget = ({
  onClose,
  isShowCategoryFilters,
}: TransactionFilterWidgetProps) => {
  const {dateRange: previousDateRange, categories: filterCategories} =
    useAppSelector(state => state.transactionFilter);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.categories);
  const [selectedDateRange, setSelectedDateRange] = useState<IDateRangeType>(
    previousDateRange || 'CURRENT_MONTH',
  );
  const [selectedCategories, setSelectedCategories] = useState<
    Record<number, boolean>
  >({...filterCategories});

  const onFilter = useCallback(() => {
    dispatch(
      setTransactionFilters({
        dateRange: selectedDateRange,
        categories: selectedCategories,
      }),
    );
    onClose();
  }, [dispatch, onClose, selectedCategories, selectedDateRange]);

  return (
    <BottomSheet onOverlayTap={onClose}>
      <Box ph={DEFAULT_CONTAINER_PADDING} pv={'16px'}>
        <Box flexDir={'row'} alignItems={'center'}>
          <LocalSvg
            width={18}
            asset={require('../../assets/icons/filter.svg')}
          />
          <Box pl={'12px'}>
            <Typography variant={'h4'}>Filter</Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      {isShowCategoryFilters && (
        <Box pt={'18px'}>
          <Box ph={DEFAULT_CONTAINER_PADDING}>
            <Typography color={'purpleLightest'} variant={'h6'}>
              Categories
            </Typography>
          </Box>
          <Box pt={'8px'}>
            <SelectInputMultipleBox
              offsetPadding={DEFAULT_CONTAINER_PADDING}
              items={categories?.map(category => ({
                value: category.categoryId,
                label: category.label,
              }))}
              selectedValue={selectedCategories}
              onSelect={val => {
                setSelectedCategories({...val} as Record<number, any>);
              }}
            />
          </Box>
        </Box>
      )}
      <Box pt={'18px'}>
        <Box ph={DEFAULT_CONTAINER_PADDING}>
          <Typography color={'purpleLightest'} variant={'h6'}>
            Date range
          </Typography>
        </Box>
        <Box pt={'8px'}>
          <SelectInputBox
            offsetPadding={DEFAULT_CONTAINER_PADDING}
            items={(Object.keys(dateRangeLabels) as IDateRangeType[]).map(
              rangeKey => ({
                value: rangeKey,
                label: dateRangeLabels[rangeKey],
              }),
            )}
            selectedValue={selectedDateRange}
            onSelect={val => setSelectedDateRange(val)}
          />
        </Box>
      </Box>
      <Box
        pt={'18px'}
        ph={DEFAULT_CONTAINER_PADDING}
        pb={DEFAULT_CONTAINER_PADDING}
        flexDir={'row'}
        justifyContent={'center'}>
        <Button size={'small'} onPress={onFilter}>
          Apply Filter
        </Button>
      </Box>
    </BottomSheet>
  );
};
export default TransactionFilterWidget;
