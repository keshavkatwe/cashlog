import type ICategoryCode from '../types/ICategoryCode';
import foodIcon from '../assets/icons/Food.svg';
import medicalIcon from '../assets/icons/Medical.svg';
import groceryIcon from '../assets/icons/Grocery.svg';
import rentIcon from '../assets/icons/Rental.svg';
import travelIcon from '../assets/icons/Travel.svg';
import otherIcon from '../assets/icons/Other.svg';
import entertainmentIcon from '../assets/icons/Entertainment.svg';
import repairIcon from '../assets/icons/Repair.svg';
import utilityIcon from '../assets/icons/Utility.svg';
import shoppingIcon from '../assets/icons/Shopping.svg';
import personalCareIcon from '../assets/icons/Personal Care.svg';
import governmentIcon from '../assets/icons/Government.svg';

export const categoryIcon: Record<ICategoryCode, string> = {
  FOOD: foodIcon,
  MEDICAL: medicalIcon,
  GROCERY: groceryIcon,
  RENT: rentIcon,
  TRAVEL: travelIcon,
  OTHER: otherIcon,
  ENTERTAINMENT: entertainmentIcon,
  REPAIR_MAINTENANCE: repairIcon,
  UTILITY: utilityIcon,
  SHOPPING: shoppingIcon,
  PERSONAL_CARE: personalCareIcon,
  GOVERNMENT_EXPENSES: governmentIcon,
};

export const categoryColors: Record<ICategoryCode, string> = {
  FOOD: '#FF6F00',
  MEDICAL: '#1E88E5',
  RENT: '#616161',
  GROCERY: '#FFC107',
  TRAVEL: '#43A047',
  OTHER: '#F50057',
  UTILITY: '#9C27B0',
  ENTERTAINMENT: '#FF5722',
  REPAIR_MAINTENANCE: '#E91E63',
  SHOPPING: '#01579B',
  PERSONAL_CARE: '#EC407A',
  GOVERNMENT_EXPENSES: '#00796B',
};
