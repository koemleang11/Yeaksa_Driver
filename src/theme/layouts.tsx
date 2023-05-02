import {Dimensions} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

export const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};

export const screenHeight = (size: any) => metrics.screenHeight * size / 981.33;
export const screenWidth = (size: any) => metrics.screenWidth * size / 480;

export const iconSize = screenWidth(24);
export const padding_horizontal = screenWidth(20);