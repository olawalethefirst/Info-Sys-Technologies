import Constants from 'expo-constants';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { Dimensions, Platform } from 'react-native';

export default function getHeaderSize() {
    const { statusBarHeight } = Constants;
    const { height, width } = Dimensions.get('window');

    return Platform.select({
        ios:
            height -
            getDefaultHeaderHeight({ height, width }, false, statusBarHeight) -
            statusBarHeight,
        android:
            height -
            getDefaultHeaderHeight({ height, width }, false, statusBarHeight),
        web:
            height -
            getDefaultHeaderHeight({ height, width }, false, statusBarHeight),
    });
}
