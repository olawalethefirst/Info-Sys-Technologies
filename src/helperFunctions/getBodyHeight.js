import Constants from 'expo-constants';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { Dimensions } from 'react-native';

export default function getHeaderSize() {
    const { statusBarHeight } = Constants;
    const { height, width } = Dimensions.get('screen');

    return (
        // Body Height without deducting bottomTabBar height
        height -
        getDefaultHeaderHeight({ height, width }, false, statusBarHeight)
    );
}
