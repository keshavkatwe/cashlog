import {FlatList, TouchableOpacity} from 'react-native';
import {Box} from '../Box';
import {LocalSvg} from 'react-native-svg';
import {Typography} from '../Typography';
import {StyledBox} from './SelectInputMultipleBox.styles';
import type {ISelectInputMultipleBoxItem} from './SelectInputMultipleBox.types';
import type {ISelectInputMultipleBoxMap} from './SelectInputMultipleBox.types';

interface ISelectInputMultipleBoxProps<T extends string | number | symbol> {
  items?: ISelectInputMultipleBoxItem<T>[];
  selectedValue?: ISelectInputMultipleBoxMap<T>;
  onSelect?: (val: ISelectInputMultipleBoxMap<T>) => void;
  offsetPadding?: string;
}
const SelectInputMultipleBox = <T extends string | number | symbol>({
  selectedValue,
  onSelect,
  items,
  offsetPadding,
}: ISelectInputMultipleBoxProps<T>) => (
  <FlatList
    data={items}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => item.value as string}
    renderItem={({item, index}) => (
      <Box
        pl={index === 0 ? offsetPadding : undefined}
        pr={
          items?.length && items?.length - 1 === index
            ? offsetPadding
            : undefined
        }>
        <TouchableOpacity
          onPress={() => {
            const existingMap: ISelectInputMultipleBoxMap<T> =
              selectedValue || {};
            existingMap[item.value] = !existingMap[item.value];
            onSelect?.(existingMap);
          }}>
          <StyledBox
            br={'br10'}
            pv={'4px'}
            ph={'10px'}
            mr={'8px'}
            flexDir={'row'}
            alignItems={'center'}
            isActive={selectedValue?.[item.value] || false}>
            {item.icon && (
              <Box mr={'6px'}>
                <LocalSvg height={20} width={20} asset={item.icon} />
              </Box>
            )}
            <Typography
              variant={selectedValue?.[item.value] ? 'lead' : 'bodySmall'}>
              {item.label}
            </Typography>
          </StyledBox>
        </TouchableOpacity>
      </Box>
    )}
  />
);

export default SelectInputMultipleBox;
