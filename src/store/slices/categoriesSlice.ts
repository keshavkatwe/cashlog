import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';
import type ICategory from '../../types/ICategory';

interface ICategoriesState {
  categories: ICategory[];
}

const initialState: ICategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (_, action: PayloadAction<ICategory[]>) => ({
      categories: action.payload,
    }),
  },
});

export const {setCategories} = categoriesSlice.actions;
export default categoriesSlice.reducer;
