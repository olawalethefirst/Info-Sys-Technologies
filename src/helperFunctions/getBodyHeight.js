import Constants from 'expo-constants';
import { getDefaultHeaderHeight } from '@react-navigation/elements';
import { Dimensions } from 'react-native';

export default function getHeaderSize() {
    const { statusBarHeight } = Constants;
    const { height, width } = Dimensions.get('window');

    return (
        height -
        getDefaultHeaderHeight({ height, width }, false, statusBarHeight)
    );
}
