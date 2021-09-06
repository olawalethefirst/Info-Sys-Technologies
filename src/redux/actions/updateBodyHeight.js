import { UPDATE_BODY_HEIGHT } from './actionTypes';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function updateBodyHeight() {
    return (dispatch) => {
        const height = hp(100);
        let bodyHeight;
        if (height > 736) {
            bodyHeight = hp(90);
        } else {
            bodyHeight = hp(89);
        }
        dispatch({
            type: UPDATE_BODY_HEIGHT,
            payload: bodyHeight,
        });
    };
}
