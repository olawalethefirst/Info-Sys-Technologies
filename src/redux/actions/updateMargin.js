import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { UPDATE_MARGIN } from './actionTypes';

export default function updateMargin() {
    return (dispatch) => {
        const margin = wp(6);
        dispatch({
            type: UPDATE_MARGIN,
            payload: margin,
        });
    };
}
