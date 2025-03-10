import type {FilterListItem} from './FilterListWidget.types';
import {FlatList, TouchableOpacity} from 'react-native';
import {Box, Typography} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {LocalSvg} from 'react-native-svg';
import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../store';
import {setTransactionFilters} from '../../store/slices/transactionFilterSlice';

interface IFilterListWidgetProps {
  items: FilterListItem[];
}
const FilterListWidget = ({items}: IFilterListWidgetProps) => {
  const dispatch = useAppDispatch();
  const {categories} = useAppSelector(state => state.transactionFilter);
  const removeCategoryFilter = useCallback(
    (categoryId: number) => {
      dispatch(
        setTransactionFilters({
          categories: {
            ...categories,
            [categoryId]: false,
          },
        }),
      );
    },
    [categories, dispatch],
  );

  const itemSeparatorComponent = useCallback(() => <Box ph={'4px'} />, []);

  return (
    <FlatList
      data={items}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.categoryId + ''}
      renderItem={({item, index}) => (
        <TouchableOpacity onPress={() => removeCategoryFilter(item.categoryId)}>
          <Box
            pl={index === 0 ? DEFAULT_CONTAINER_PADDING : '0px'}
            pr={index === items.length - 1 ? DEFAULT_CONTAINER_PADDING : '0px'}>
            <Box
              bgColor={'purpleLightest'}
              ph={'10px'}
              pv={'5px'}
              br={'br10'}
              flexDir={'row'}
              alignItems={'center'}>
              <Typography>{item.categoryLabel}</Typography>
              <Box pl={'10px'}>
                <LocalSvg asset={require('../../assets/icons/cross.svg')} />
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={itemSeparatorComponent}
    />
  );
};
export default FilterListWidget;
