import {Box} from '../Box';
import {Typography} from '../Typography';
import type {ISelectInputBoxItem} from './SelectInputBox.types';
import {SvgXml} from 'react-native-svg';
import {FlatList, TouchableOpacity} from 'react-native';
import {StyledBox} from './SelectInputBox.styles';

export interface ISelectInputBoxProps<T> {
  items?: ISelectInputBoxItem<T>[];
  selectedValue?: T;
  onSelect?: (val: T) => void;
  offsetPadding?: string;
}
const SelectInputBox = <T extends unknown>({
  items,
  selectedValue,
  onSelect,
  offsetPadding,
}: ISelectInputBoxProps<T>) => (
  <FlatList
    keyboardShouldPersistTaps={'always'}
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
        <TouchableOpacity onPress={() => onSelect?.(item.value)}>
          <StyledBox
            br={'br10'}
            pv={'4px'}
            ph={'10px'}
            mr={'8px'}
            flexDir={'row'}
            alignItems={'center'}
            isActive={selectedValue === item.value}>
            {item.icon && (
              <Box mr={'6px'}>
                <SvgXml height={20} width={20} xml={item.icon} />
              </Box>
            )}
            <Typography
              variant={selectedValue === item.value ? 'lead' : 'bodySmall'}>
              {item.label}
            </Typography>
          </StyledBox>
        </TouchableOpacity>
      </Box>
    )}
  />
);
export default SelectInputBox;
