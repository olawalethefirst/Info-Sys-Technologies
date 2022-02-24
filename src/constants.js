import { Platform } from 'react-native';
import Constant from 'expo-constants';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';

const isIOS = Platform.OS === 'ios';
const { statusBarHeight } = Constant;

console.log(statusBarHeight);

export const stickyHeaderHeight = 50;
export const modalSelectorStyles = (fontFactor) => {
    return {
        sectionTextStyle: {
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
            fontFamily: 'Karla_500Medium',
        },
        optionContainerStyle: {
            backgroundColor: '#fff',
            marginBottom: fontFactor * wp(2.2),
        },
        cancelStyle: {
            backgroundColor: '#ddd',
            padding: fontFactor * wp(2.2),
            borderRadius: fontFactor * wp(1.35),
            marginBottom: fontFactor * wp(2.2),
        },
        optionTextStyle: {
            color: 'black',
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
            fontFamily: 'Karla_400Regular',
        },
        cancelTextStyle: {
            color: 'red',
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
            fontFamily: 'Karla_400Regular',
        },
        overlayStyle: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            marginTop: isIOS ? statusBarHeight : 0,
        },
    };
};
