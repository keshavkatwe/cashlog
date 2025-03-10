import {Dimensions, PixelRatio} from 'react-native';

function normalize(size: number, based = 'width') {
  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
  const widthBaseScale = SCREEN_WIDTH / 414;
  const heightBaseScale = SCREEN_HEIGHT / 896;
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

//for width  pixel
export const widthPixel = (size: number) => normalize(size, 'width');
//for height  pixel
export const heightPixel = (size: number) => normalize(size, 'height');
//for font  pixel
export const fontPixel = (size: number) => heightPixel(size);
//for Margin and Padding vertical pixel
export const pixelSizeVertical = (size: number) => heightPixel(size);
//for Margin and Padding horizontal pixel
export const pixelSizeHorizontal = (size: number) => widthPixel(size);
