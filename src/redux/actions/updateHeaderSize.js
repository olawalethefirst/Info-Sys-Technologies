import { UPDATE_HEADER_SIZE } from './actionTypes';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function updateHeaderSize() {
    return (dispatch) => {
        const hpLarger = hp(100) > wp(100);
        const height = hpLarger ? hp(100) : wp(100);
        let headerHeight;
        if (height > 736) {
            headerHeight = hpLarger ? hp(9) : wp(9);
        } else {
            headerHeight = hpLarger ? hp(10) : wp(10);
        }
        dispatch({
            type: UPDATE_HEADER_SIZE,
            payload: headerHeight,
        });
    };
}
