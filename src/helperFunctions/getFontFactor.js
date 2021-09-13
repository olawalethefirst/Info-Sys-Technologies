import getDeviceWidthClass from './getDeviceWidthClass';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function getFontFactor() {
    const width = wp(100);
    const deviceWidthClass = getDeviceWidthClass(width);

    if (deviceWidthClass === -1) {
        return 1;
    } else if (deviceWidthClass === 0) {
        return 0.8;
    } else if (deviceWidthClass === 1) {
        return 0.6;
    }
}
