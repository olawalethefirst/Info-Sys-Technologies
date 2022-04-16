import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function getDeviceWidth() {
    const width = wp(100);
    console.log(width);
    if (width < 500) {
        return -1;
    } else if (width >= 500 && width < 641) {
        return 0;
    } else if (width >= 641) {
        return 1;
    }
    return;
}
