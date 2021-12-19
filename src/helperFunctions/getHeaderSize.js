import Constants from 'expo-constants';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { Dimensions, Platform } from 'react-native';

export default function getHeaderSize() {
    const { statusBarHeight } = Constants;
    const { height, width } = Dimensions.get('window');

    return Platform.select({
        ios: getDefaultHeaderHeight({ height, width }, false, statusBarHeight),
        android:
            getDefaultHeaderHeight({ height, width }, false, statusBarHeight) -
            statusBarHeight,
        web: getDefaultHeaderHeight({ height, width }, false, statusBarHeight),
    });
}
