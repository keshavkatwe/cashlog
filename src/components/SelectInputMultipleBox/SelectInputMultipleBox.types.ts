import type {ImageSourcePropType} from 'react-native';

export interface ISelectInputMultipleBoxItem<T> {
  label: string;
  value: T;
  icon?: ImageSourcePropType;
}

export type ISelectInputMultipleBoxMap<T extends string | number | symbol> = {
  [KEY in T]?: boolean;
};
