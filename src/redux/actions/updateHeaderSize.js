import { UPDATE_HEADER_SIZE } from './actionTypes';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function updateHeaderSize() {
    return (dispatch) => {
        const height = hp(100);
        let headerHeight;
        if (height > 736) {
            headerHeight = hp(10);
        } else {
            headerHeight = hp(11);
        }
        dispatch({
            type: UPDATE_HEADER_SIZE,
            payload: headerHeight,
        });
    };
}
